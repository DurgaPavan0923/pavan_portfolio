import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileDock } from '@/components/layout/MobileDock';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

describe('MobileDock Component', () => {
  it('renders quick navigation actions and triggers callbacks', () => {
    const onOpenPalette = vi.fn();
    const onOpenChat = vi.fn();

    render(
      <ThemeProvider>
        <MobileDock
          onOpenPalette={onOpenPalette}
          onOpenChat={onOpenChat}
          isChatOpen={false}
        />
      </ThemeProvider>
    );

    const paletteBtn = screen.getByRole('button', { name: /open command palette/i });
    fireEvent.click(paletteBtn);
    expect(onOpenPalette).toHaveBeenCalledTimes(1);

    const chatBtn = screen.getByRole('button', { name: /open ai chat/i });
    fireEvent.click(chatBtn);
    expect(onOpenChat).toHaveBeenCalledTimes(1);
  });
});

describe('CommandPalette Component', () => {
  it('renders all commands when opened', () => {
    const onClose = vi.fn();
    const onOpenChat = vi.fn();
    const onToggleFocusMode = vi.fn();

    render(
      <ThemeProvider>
        <CommandPalette
          isOpen={true}
          onClose={onClose}
          onOpenChat={onOpenChat}
          isFocusMode={false}
          onToggleFocusMode={onToggleFocusMode}
        />
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText(/type a command/i)).toBeDefined();
    expect(screen.getByText(/Explore Featured Projects/i)).toBeDefined();
    expect(screen.getByText(/Why Work With Me/i)).toBeDefined();
    expect(screen.getByText(/Toggle Focus Mode/i)).toBeDefined();
    expect(screen.getByText(/Download Official Resume/i)).toBeDefined();
  });

  it('triggers focus mode toggle command', () => {
    const onClose = vi.fn();
    const onOpenChat = vi.fn();
    const onToggleFocusMode = vi.fn();

    render(
      <ThemeProvider>
        <CommandPalette
          isOpen={true}
          onClose={onClose}
          onOpenChat={onOpenChat}
          isFocusMode={false}
          onToggleFocusMode={onToggleFocusMode}
        />
      </ThemeProvider>
    );

    const focusBtn = screen.getByText(/Toggle Focus Mode/i);
    fireEvent.click(focusBtn);

    expect(onToggleFocusMode).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
