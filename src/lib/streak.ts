import { ContributionDay, ContributionWeek } from './github';

export function calculateStreaks(
  weeks: ContributionWeek[],
  referenceDate?: Date
): { currentStreak: number; longestStreak: number } {
  const days: ContributionDay[] = [];
  const seenDates = new Set<string>();

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day && day.date && !seenDates.has(day.date)) {
        seenDates.add(day.date);
        days.push(day);
      }
    }
  }

  days.sort((a, b) => a.date.localeCompare(b.date));

  if (days.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // 1. Calculate longest streak across entire sorted timeline
  let longestStreak = 0;
  let currentRun = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      currentRun++;
      if (currentRun > longestStreak) {
        longestStreak = currentRun;
      }
    } else {
      currentRun = 0;
    }
  }

  // 2. Calculate current active streak
  // Reference date defaults to now (UTC)
  const now = referenceDate || new Date();
  const todayUtc = now.toISOString().split('T')[0];
  const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayUtc = yesterdayDate.toISOString().split('T')[0];

  // Map dates for O(1) lookup
  const countByDate = new Map<string, number>();
  for (const day of days) {
    countByDate.set(day.date, day.contributionCount);
  }

  // Determine starting point for current streak:
  // If today has contributions, start streak today.
  // If today has 0, but yesterday had contributions, the streak is alive from yesterday.
  // Otherwise current streak is 0.
  let startDate: string | null = null;
  const todayCount = countByDate.get(todayUtc);
  const yesterdayCount = countByDate.get(yesterdayUtc);

  if (todayCount && todayCount > 0) {
    startDate = todayUtc;
  } else if (yesterdayCount && yesterdayCount > 0) {
    startDate = yesterdayUtc;
  } else {
    // Also check the very latest day present in the days array if reference date is ahead of calendar
    const lastDay = days[days.length - 1];
    if (lastDay && lastDay.date >= yesterdayUtc && lastDay.contributionCount > 0) {
      startDate = lastDay.date;
    }
  }

  if (!startDate) {
    return { currentStreak: 0, longestStreak };
  }

  // Count backwards day by day from startDate using calendar date arithmetic
  let currentStreak = 0;
  let checkDate = new Date(startDate + 'T12:00:00Z');

  while (true) {
    const checkDateStr = checkDate.toISOString().split('T')[0];
    const count = countByDate.get(checkDateStr);

    if (count !== undefined && count > 0) {
      currentStreak++;
      // Step back 1 day
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}
