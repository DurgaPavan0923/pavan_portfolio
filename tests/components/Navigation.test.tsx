import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

describe('MobileMenu Component', () => {
  it('renders mobile navigation drawer and triggers palette callback', () => {
    const onClose = vi.fn();
    const onOpenPalette = vi.fn();
    const onOpenChat = vi.fn();

    render(
      <ThemeProvider>
        <MobileMenu
          isOpen={true}
          onClose={onClose}
          onOpenPalette={onOpenPalette}
          onOpenChat={onOpenChat}
        />
      </ThemeProvider>
    );

    // Verify ⌘K trigger button
    const paletteBtn = screen.getByRole('button', { name: /command palette/i });
    fireEvent.click(paletteBtn);
    expect(onOpenPalette).toHaveBeenCalledTimes(1);

    // Verify nav links exist
    const projectLink = screen.getByRole('link', { name: /featured projects/i });
    expect(projectLink).toBeDefined();

    // Verify close was called on palette open and on link click
    fireEvent.click(projectLink);
    expect(onClose).toHaveBeenCalledTimes(2);
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
    expect(screen.getByText(/Featured Projects/i)).toBeDefined();
    expect(screen.getByText(/Toggle Focus Mode/i)).toBeDefined();
    expect(screen.getByText(/Download Resume/i)).toBeDefined();
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
