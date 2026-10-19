import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes properly', () => {
    const isDark = true;
    const isHidden = false;
    expect(cn('base', isDark && 'bg-black', isHidden && 'hidden')).toBe('base bg-black');
  });

  it('resolves conflicting tailwind classes with tailwind-merge', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});
