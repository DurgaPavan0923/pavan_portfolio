import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGitHubData, FALLBACK_GITHUB_STATS } from '@/lib/github';

describe('fetchGitHubData', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('has valid fallback GitHub stats with 4 featured repos', () => {
    expect(FALLBACK_GITHUB_STATS.publicRepos).toBeGreaterThanOrEqual(20);
    expect(FALLBACK_GITHUB_STATS.totalCommits).toBeGreaterThanOrEqual(100);
    expect(FALLBACK_GITHUB_STATS.featuredRepos.length).toBe(4);
    const repoNames = FALLBACK_GITHUB_STATS.featuredRepos.map((r) => r.name);
    expect(repoNames).toContain('IRA');
    expect(repoNames).toContain('AGORA-PROXIMA');
  });

  it('returns fallback data gracefully if GitHub API network call throws', async () => {
    // Force global fetch to fail
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('GitHub API rate limit exceeded'));

    const data = await fetchGitHubData('DurgaPavan0923');
    expect(data.publicRepos).toBe(FALLBACK_GITHUB_STATS.publicRepos);
    expect(data.featuredRepos).toEqual(FALLBACK_GITHUB_STATS.featuredRepos);
  });
});
