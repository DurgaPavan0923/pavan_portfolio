import { describe, it, expect } from 'vitest';
import { calculateStreaks } from '@/lib/streak';
import { ContributionWeek, ContributionDay } from '@/lib/github';

function makeWeeks(daySpecs: { date: string; count: number }[]): ContributionWeek[] {
  const days: ContributionDay[] = daySpecs.map((spec, idx) => ({
    date: spec.date,
    contributionCount: spec.count,
    contributionLevel: spec.count > 0 ? 'FIRST_QUARTILE' : 'NONE',
    weekday: idx % 7,
  }));

  const weeks: ContributionWeek[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ contributionDays: days.slice(i, i + 7) });
  }
  return weeks;
}

describe('calculateStreaks', () => {
  it('returns { currentStreak: 0, longestStreak: 0 } for empty calendar', () => {
    const res = calculateStreaks([]);
    expect(res).toEqual({ currentStreak: 0, longestStreak: 0 });
  });

  it('returns 0 for both current and longest when all days have 0 contributions', () => {
    const weeks = makeWeeks([
      { date: '2026-11-01', count: 0 },
      { date: '2026-11-02', count: 0 },
      { date: '2026-11-03', count: 0 },
    ]);
    const refDate = new Date('2026-11-03T12:00:00Z');
    expect(calculateStreaks(weeks, refDate)).toEqual({ currentStreak: 0, longestStreak: 0 });
  });

  it('calculates active current streak when today has contributions', () => {
    const weeks = makeWeeks([
      { date: '2026-11-01', count: 1 },
      { date: '2026-11-02', count: 2 },
      { date: '2026-11-03', count: 3 },
    ]);
    const refDate = new Date('2026-11-03T12:00:00Z');
    const res = calculateStreaks(weeks, refDate);
    expect(res.currentStreak).toBe(3);
    expect(res.longestStreak).toBe(3);
  });

  it('keeps streak alive when today is 0 but yesterday has contributions', () => {
    const weeks = makeWeeks([
      { date: '2026-11-01', count: 2 },
      { date: '2026-11-02', count: 1 },
      { date: '2026-11-03', count: 0 }, // Today: 0
    ]);
    const refDate = new Date('2026-11-03T12:00:00Z');
    const res = calculateStreaks(weeks, refDate);
    expect(res.currentStreak).toBe(2); // Nov 1 and Nov 2
    expect(res.longestStreak).toBe(2);
  });

  it('breaks current streak when both today and yesterday are 0', () => {
    const weeks = makeWeeks([
      { date: '2026-10-31', count: 4 },
      { date: '2026-11-01', count: 5 },
      { date: '2026-11-02', count: 0 }, // Yesterday: 0
      { date: '2026-11-03', count: 0 }, // Today: 0
    ]);
    const refDate = new Date('2026-11-03T12:00:00Z');
    const res = calculateStreaks(weeks, refDate);
    expect(res.currentStreak).toBe(0);
    expect(res.longestStreak).toBe(2);
  });

  it('correctly calculates streaks across year boundaries (Dec 30 to Jan 2)', () => {
    const weeks = makeWeeks([
      { date: '2025-12-30', count: 1 },
      { date: '2025-12-31', count: 1 },
      { date: '2026-01-01', count: 1 },
      { date: '2026-01-02', count: 1 },
    ]);
    const refDate = new Date('2026-01-02T12:00:00Z');
    const res = calculateStreaks(weeks, refDate);
    expect(res.currentStreak).toBe(4);
    expect(res.longestStreak).toBe(4);
  });

  it('correctly calculates streaks across leap year boundary (Feb 28 to Mar 1 in leap year)', () => {
    const weeks = makeWeeks([
      { date: '2024-02-28', count: 1 },
      { date: '2024-02-29', count: 2 },
      { date: '2024-03-01', count: 1 },
    ]);
    const refDate = new Date('2024-03-01T12:00:00Z');
    const res = calculateStreaks(weeks, refDate);
    expect(res.currentStreak).toBe(3);
    expect(res.longestStreak).toBe(3);
  });

  it('distinguishes between a past record longest streak and a shorter current streak', () => {
    const weeks = makeWeeks([
      // Past streak of 5 days
      { date: '2026-10-10', count: 1 },
      { date: '2026-10-11', count: 1 },
      { date: '2026-10-12', count: 1 },
      { date: '2026-10-13', count: 1 },
      { date: '2026-10-14', count: 1 },
      // Gap
      { date: '2026-10-15', count: 0 },
      // Current streak of 2 days
      { date: '2026-10-16', count: 2 },
      { date: '2026-10-17', count: 1 },
    ]);
    const refDate = new Date('2026-10-17T12:00:00Z');
    const res = calculateStreaks(weeks, refDate);
    expect(res.currentStreak).toBe(2);
    expect(res.longestStreak).toBe(5);
  });

  it('handles unsorted input days and deduplicates cleanly', () => {
    const week: ContributionWeek = {
      contributionDays: [
        { date: '2026-11-03', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE', weekday: 2 },
        { date: '2026-11-01', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE', weekday: 0 },
        { date: '2026-11-02', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE', weekday: 1 },
        { date: '2026-11-02', contributionCount: 1, contributionLevel: 'FIRST_QUARTILE', weekday: 1 }, // duplicate
      ],
    };
    const refDate = new Date('2026-11-03T12:00:00Z');
    const res = calculateStreaks([week], refDate);
    expect(res.currentStreak).toBe(3);
    expect(res.longestStreak).toBe(3);
  });
});
