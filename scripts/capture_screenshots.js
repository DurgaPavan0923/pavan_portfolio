const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-cdp-'));
  const port = 9444; // use unique port
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${tmpDir}`,
    'about:blank'
  ]);

  try {
    let target = null;
    for (let i = 0; i < 40; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) {
          target = await res.json();
          break;
        }
      } catch (e) {}
    }

    if (!target) {
      throw new Error('Chrome CDP failed to start on port ' + port);
    }

    console.log('Chrome CDP ready:', target.Browser);

    const widths = [360, 390, 430, 768, 1440];
    const themes = ['dark', 'light'];
    const outDir = path.join(__dirname, '..', 'docs', 'screenshots', 'before');
    fs.mkdirSync(outDir, { recursive: true });

    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const list = await listRes.json();
    const pageTarget = list.find((t) => t.type === 'page') || list[0];
    console.log('Connecting to page WebSocket:', pageTarget.webSocketDebuggerUrl);

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const cb = callbacks.get(data.id);
        callbacks.delete(data.id);
        cb(data);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');

    for (const theme of themes) {
      for (const w of widths) {
        const h = w > 768 ? 900 : 800;
        console.log(`Capturing ${theme} at ${w}x${h}...`);

        await send('Emulation.setDeviceMetricsOverride', {
          width: w,
          height: h,
          deviceScaleFactor: 2,
          mobile: w <= 768
        });

        await send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-color-scheme', value: theme }]
        });

        await send('Page.navigate', { url: 'https://pavan-portfolio-gamma-six.vercel.app/' });
        
        // Wait for page to fully render
        await sleep(5000);

        await send('Runtime.evaluate', {
          expression: `
            document.documentElement.classList.remove('light','dark');
            document.documentElement.classList.add('${theme}');
            document.documentElement.setAttribute('data-theme', '${theme}');
            try { localStorage.setItem('pavan_portfolio_theme', '${theme}'); } catch(e){}
          `
        });
        await sleep(1000);

        const screenshotRes = await send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: false
        });

        if (screenshotRes.result?.data) {
          const filePath = path.join(outDir, `${theme}-${w}px.png`);
          fs.writeFileSync(filePath, Buffer.from(screenshotRes.result.data, 'base64'));
          const kb = Math.round(screenshotRes.result.data.length * 0.75 / 1024);
          console.log(`Saved: ${filePath} (${kb} KB)`);
        } else {
          console.error(`Failed to capture ${theme}-${w}px:`, screenshotRes);
        }
      }
    }

    ws.close();
  } finally {
    chrome.kill('SIGKILL');
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

capture().then(() => {
  console.log('All before screenshots captured successfully!');
  process.exit(0);
}).catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
