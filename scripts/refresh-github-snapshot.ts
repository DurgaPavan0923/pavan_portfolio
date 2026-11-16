import fs from 'node:fs';
import path from 'node:path';
import { calculateStreaks } from '../src/lib/streak';
import type { ContributionDay, ContributionWeek, GitHubTelemetryData, TopLanguage, FeaturedRepo, VerifiedContribution } from '../src/lib/github';

const USERNAME = 'DurgaPavan0923';

const FEATURED_DESCRIPTIONS: Record<string, { displayName: string; desc: string; lang: string; color: string }> = {
  'AI-Powered-Fake-News-Detector-for-Students': {
    displayName: 'FactLens AI',
    desc: 'Multi-agent explainable AI fact-verification platform combining Google Gemini API, Neo4j knowledge graph traversal, and Pinecone vector search.',
    lang: 'TypeScript',
    color: '#3178c6',
  },
  'AI-Resume-Screening-Job-Match-System': {
    displayName: 'InsightAI ATS',
    desc: 'Semantic resume screening, ATS alignment scoring, and contextual interview question copilot.',
    lang: 'Python',
    color: '#3572A5',
  },
  'RajanaDurgaPavanKumar_C1_ONLINETIHIITG': {
    displayName: 'AquaGuard ML (TIH IIT Guwahati)',
    desc: 'Dual-track environmental machine learning for calibrated water potability classification and oceanographic CTD sensor forecasting.',
    lang: 'Python',
    color: '#3572A5',
  },
  'IRA': {
    displayName: 'IRA 3D Smart City',
    desc: 'Interactive 3D urban terrain simulation and predictive municipal resource regression demand forecasting prototype.',
    lang: 'TypeScript',
    color: '#3178c6',
  },
};

const GITHUB_GRAPHQL_QUERY = `
query ($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    name
    login
    avatarUrl
    bio
    followers { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        pushedAt
        isPrivate
        isFork
        primaryLanguage {
          name
          color
        }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    pullRequests(first: 10, states: [MERGED], orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        id
        title
        url
        mergedAt
        repository {
          nameWithOwner
        }
      }
    }
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
            contributionLevel
          }
        }
      }
    }
  }
}
`;

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'recently';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return 'recently';
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears}y ago`;
  } catch {
    return 'recently';
  }
}

async function fetchJson(url: string, headers: Record<string, string> = {}) {
  const token = process.env.GITHUB_TOKEN;
  const authHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Snapshot-Script',
      Accept: 'application/vnd.github.v3+json',
      ...authHeaders,
      ...headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function scrapeCalendarHtml(username: string): Promise<{ total: number; weeks: ContributionWeek[] }> {
  const res = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch contributions HTML: ${res.status}`);
  }
  const html = await res.text();

  let total = 0;
  const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+the\s+last\s+year/i);
  if (totalMatch) {
    total = parseInt(totalMatch[1].replace(/,/g, ''), 10);
  }

  const tooltips = new Map<string, string>();
  const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  let match: RegExpExecArray | null;
  while ((match = tipRegex.exec(html)) !== null) {
    tooltips.set(match[1], match[2]);
  }

  const dayElements: { id: string; date: string; level: number }[] = [];
  const dayRegex = /<td[^>]*id="(contribution-day-component-[^"]+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g;
  while ((match = dayRegex.exec(html)) !== null) {
    dayElements.push({
      id: match[1],
      date: match[2],
      level: parseInt(match[3], 10),
    });
  }

  if (dayElements.length === 0) {
    const dayRegex2 = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-[^"]+)"[^>]*data-level="(\d+)"/g;
    while ((match = dayRegex2.exec(html)) !== null) {
      dayElements.push({
        id: match[2],
        date: match[1],
        level: parseInt(match[3], 10),
      });
    }
  }

  if (dayElements.length === 0) {
    throw new Error('No contribution days parsed from GitHub HTML');
  }

  const days: ContributionDay[] = dayElements.map((elem) => {
    const tip = tooltips.get(elem.id) || '';
    let count = 0;
    if (tip && !tip.includes('No contribution')) {
      const cm = tip.match(/(\d+)\s+contribution/);
      if (cm) count = parseInt(cm[1], 10);
      else count = elem.level;
    }
    const d = new Date(elem.date + 'T12:00:00Z');
    const weekday = d.getUTCDay();

    let levelStr: ContributionDay['contributionLevel'] = 'NONE';
    if (elem.level === 1) levelStr = 'FIRST_QUARTILE';
    else if (elem.level === 2) levelStr = 'SECOND_QUARTILE';
    else if (elem.level === 3) levelStr = 'THIRD_QUARTILE';
    else if (elem.level >= 4) levelStr = 'FOURTH_QUARTILE';

    return {
      date: elem.date,
      contributionCount: count,
      contributionLevel: levelStr,
      weekday,
    };
  });

  days.sort((a, b) => a.date.localeCompare(b.date));

  if (total === 0) {
    total = days.reduce((sum, d) => sum + d.contributionCount, 0);
  }

  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({
      contributionDays: days.slice(i, i + 7),
    });
  }

  return { total, weeks };
}

async function tryGraphQL(username: string, token: string): Promise<GitHubTelemetryData | null> {
  try {
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const fromIso = oneYearAgo.toISOString();
    const toIso = now.toISOString();

    console.log('Attempting GitHub GraphQL telemetry fetch...');
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Snapshot-Script',
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: {
          login: username,
          from: fromIso,
          to: toIso,
        },
      }),
    });

    if (!response.ok) {
      console.warn(`GitHub GraphQL returned HTTP ${response.status}`);
      return null;
    }

    const json = await response.json();
    if (json.errors && Array.isArray(json.errors) && json.errors.length > 0) {
      console.warn('GitHub GraphQL returned errors:', json.errors);
    }

    const user = json.data?.user;
    if (!user) return null;

    const repos = user.repositories?.nodes || [];
    const totalStars = repos.reduce((acc: number, r: { stargazerCount?: number }) => acc + (r.stargazerCount || 0), 0);
    const totalForks = repos.reduce((acc: number, r: { forkCount?: number }) => acc + (r.forkCount || 0), 0);

    const languageSizes: Record<string, { size: number; color?: string }> = {};
    for (const repo of repos) {
      const edges = repo.languages?.edges || [];
      for (const edge of edges) {
        const langName = edge.node?.name;
        const size = edge.size || 0;
        if (langName) {
          if (!languageSizes[langName]) {
            languageSizes[langName] = { size: 0, color: edge.node?.color };
          }
          languageSizes[langName].size += size;
        }
      }
    }

    const totalBytes = Object.values(languageSizes).reduce((acc, l) => acc + l.size, 0);
    const topLanguages: TopLanguage[] = Object.entries(languageSizes)
      .map(([name, data]) => ({
        name,
        percentage: totalBytes > 0 ? Math.round((data.size / totalBytes) * 100) : 0,
        color: data.color || '#38bdf8',
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    const targetNames = [
      'AI-Powered-Fake-News-Detector-for-Students',
      'AI-Resume-Screening-Job-Match-System',
      'RajanaDurgaPavanKumar_C1_ONLINETIHIITG',
      'IRA',
    ];

    const featuredRepos: FeaturedRepo[] = targetNames.map((targetName) => {
      const liveRepo = repos.find((r: { name: string }) => r.name === targetName);
      const meta = FEATURED_DESCRIPTIONS[targetName];
      return {
        name: targetName,
        displayName: meta?.displayName || targetName,
        description: liveRepo?.description || meta?.desc || 'Open-source repository by DurgaPavan0923.',
        language: liveRepo?.primaryLanguage?.name || meta?.lang || 'Python',
        languageColor: liveRepo?.primaryLanguage?.color || meta?.color || '#3572A5',
        stars: liveRepo?.stargazerCount || 0,
        forks: liveRepo?.forkCount || 0,
        url: liveRepo?.url || `https://github.com/${username}/${targetName}`,
        updatedAt: liveRepo?.pushedAt || new Date().toISOString(),
        updatedRelative: liveRepo?.pushedAt ? formatRelativeTime(liveRepo.pushedAt) : 'recently',
      };
    });

    const verifiedContributions: VerifiedContribution[] = (user.pullRequests?.nodes || []).map((pr: {
      id: string;
      title: string;
      url: string;
      mergedAt: string;
      repository?: { nameWithOwner?: string };
    }) => ({
      id: pr.id,
      type: 'PR',
      title: pr.title,
      repo: pr.repository?.nameWithOwner || `${username}/repo`,
      url: pr.url,
      date: pr.mergedAt,
      relativeDate: formatRelativeTime(pr.mergedAt),
    }));

    const calWeeks: ContributionWeek[] = user.contributionsCollection?.contributionCalendar?.weeks || [];
    const streaks = calculateStreaks(calWeeks);
    const totalContributions = user.contributionsCollection?.contributionCalendar?.totalContributions ?? 288;
    const totalCommits = user.contributionsCollection?.totalCommitContributions ?? 215;

    console.log(`GraphQL fetch succeeded! Contributions: ${totalContributions}, PRs: ${verifiedContributions.length}`);

    return {
      username: user.login || username,
      publicRepos: user.repositories?.totalCount ?? 23,
      followers: user.followers?.totalCount ?? 22,
      totalStars,
      totalForks,
      totalContributions,
      totalCommits,
      totalPRs: verifiedContributions.length,
      totalIssues: user.contributionsCollection?.totalIssueContributions ?? 0,
      currentStreak: streaks.currentStreak,
      longestStreak: streaks.longestStreak,
      topLanguages,
      featuredRepos,
      verifiedContributions,
      calendar: {
        totalContributions,
        weeks: calWeeks,
      },
      fetchedAt: new Date().toISOString(),
      isStale: true,
    };
  } catch (err) {
    console.warn('GraphQL fetch in snapshot scraper failed, falling back:', err);
    return null;
  }
}

async function main() {
  const outputPath = path.resolve(process.cwd(), 'src/data/github-snapshot.json');
  let previousSnapshot: GitHubTelemetryData | null = null;

  if (fs.existsSync(outputPath)) {
    try {
      previousSnapshot = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    } catch {
      // Ignored
    }
  }

  const token = process.env.GITHUB_TOKEN;

  // 1. Try GraphQL first if token is available
  if (token) {
    const gqlSnapshot = await tryGraphQL(USERNAME, token);
    if (gqlSnapshot && gqlSnapshot.featuredRepos.length === 4) {
      fs.writeFileSync(outputPath, JSON.stringify(gqlSnapshot, null, 2), 'utf-8');
      console.log(`Successfully wrote fresh GraphQL snapshot to ${outputPath}`);
      return;
    }
  }

  // 2. Fallback to REST + scraping
  console.log(`Refreshing GitHub snapshot via REST/Scraper for ${USERNAME}...`);

  let publicRepos = previousSnapshot?.publicRepos ?? 23;
  let followers = previousSnapshot?.followers ?? 22;
  try {
    const user = await fetchJson(`https://api.github.com/users/${USERNAME}`);
    publicRepos = user.public_repos || publicRepos;
    followers = user.followers || followers;
    console.log(`Public repos: ${publicRepos}, followers: ${followers}`);
  } catch (e) {
    console.warn('Could not fetch user profile from REST API, using fallback:', e);
  }

  let repos: any[] = [];
  try {
    repos = await fetchJson(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`);
    console.log(`Fetched ${repos.length} public repos.`);
  } catch (e) {
    console.warn('Could not fetch repos list from REST API, using fallback:', e);
  }

  const totalStars = repos.reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc: number, r: { forks_count?: number }) => acc + (r.forks_count || 0), 0);

  const langCount: Record<string, number> = {};
  for (const r of repos) {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + (r.size || 1);
    }
  }
  const totalLangSize = Object.values(langCount).reduce((a, b) => a + b, 0);
  const langColors: Record<string, string> = {
    Python: '#3572A5',
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Jupyter: '#DA5B0B',
    'Jupyter Notebook': '#DA5B0B',
  };

  let topLanguages: TopLanguage[] = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, size]) => ({
      name,
      percentage: totalLangSize > 0 ? Math.round((size / totalLangSize) * 100) : 0,
      color: langColors[name] || '#38bdf8',
    }));

  if (topLanguages.length === 0 && previousSnapshot?.topLanguages) {
    topLanguages = previousSnapshot.topLanguages;
  }

  const priorityRepoNames = [
    'AI-Powered-Fake-News-Detector-for-Students',
    'AI-Resume-Screening-Job-Match-System',
    'RajanaDurgaPavanKumar_C1_ONLINETIHIITG',
    'IRA',
  ];

  const featuredRepos: FeaturedRepo[] = priorityRepoNames.map((name) => {
    const match = repos.find((r: { name: string }) => r.name === name);
    const meta = FEATURED_DESCRIPTIONS[name];
    return {
      name,
      displayName: meta?.displayName || name,
      description: match?.description || meta?.desc || 'Open-source repository by DurgaPavan0923.',
      language: meta?.lang || match?.language || 'Python',
      languageColor: meta?.color || langColors[match?.language] || '#3572A5',
      stars: match?.stargazers_count || 0,
      forks: match?.forks_count || 0,
      url: match?.html_url || `https://github.com/${USERNAME}/${name}`,
      updatedAt: match?.pushed_at || new Date().toISOString(),
      updatedRelative: match?.pushed_at ? formatRelativeTime(match.pushed_at) : 'recently',
    };
  });

  // Merged PRs / verified contributions
  let verifiedContributions: VerifiedContribution[] = previousSnapshot?.verifiedContributions ?? [];
  try {
    const prsRes = await fetchJson(`https://api.github.com/search/issues?q=author:${USERNAME}+type:pr`);
    const fetchedPRs: VerifiedContribution[] = [];
    for (const item of prsRes.items || []) {
      try {
        const prData = await fetchJson(item.pull_request.url);
        if (prData.merged) {
          const repoName = item.repository_url ? item.repository_url.split('/').slice(-2).join('/') : '';
          fetchedPRs.push({
            id: String(item.id),
            type: 'PR',
            title: item.title,
            repo: repoName,
            url: item.html_url,
            date: prData.merged_at || item.closed_at || item.created_at,
            relativeDate: 'merged',
          });
        }
      } catch (e) {
        console.warn(`Could not fetch details for PR #${item.number}:`, e);
      }
    }
    if (fetchedPRs.length > 0) {
      verifiedContributions = fetchedPRs;
    }
  } catch (e) {
    console.warn('Could not fetch PR search from GitHub REST API, keeping existing contributions:', e);
  }

  // Scrape public calendar
  let totalContributions = previousSnapshot?.totalContributions ?? 288;
  let weeks: ContributionWeek[] = previousSnapshot?.calendar.weeks ?? [];
  try {
    console.log('Scraping calendar HTML...');
    const cal = await scrapeCalendarHtml(USERNAME);
    totalContributions = cal.total;
    weeks = cal.weeks;
    console.log(`Parsed ${weeks.length} weeks, total contributions: ${totalContributions}`);
  } catch (e) {
    console.warn('Could not scrape calendar HTML, keeping existing calendar data:', e);
  }

  const streaks = calculateStreaks(weeks);

  const snapshot: GitHubTelemetryData = {
    username: USERNAME,
    publicRepos,
    followers,
    totalStars,
    totalForks,
    totalContributions,
    totalCommits: 215,
    totalPRs: verifiedContributions.length,
    totalIssues: 0,
    currentStreak: streaks.currentStreak,
    longestStreak: streaks.longestStreak,
    topLanguages,
    featuredRepos,
    verifiedContributions,
    calendar: {
      totalContributions,
      weeks,
    },
    fetchedAt: new Date().toISOString(),
    isStale: true,
  };

  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2), 'utf-8');
  console.log(`Successfully wrote fresh snapshot to ${outputPath}`);
}

main().catch((err) => {
  console.error('Error refreshing snapshot:', err);
  // Do not crash with exit(1) if snapshot exists on disk
  const outputPath = path.resolve(process.cwd(), 'src/data/github-snapshot.json');
  if (fs.existsSync(outputPath)) {
    console.log('Valid snapshot remains on disk. Exiting cleanly.');
    process.exit(0);
  }
  process.exit(1);
});
