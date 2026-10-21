import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGitHubTelemetry, fetchGitHubData, FALLBACK_GITHUB_STATS, FeaturedRepo } from '@/lib/github';

describe('GitHub Telemetry API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('has valid fallback GitHub stats with 4 featured repos', () => {
    expect(FALLBACK_GITHUB_STATS.publicRepos).toBeGreaterThanOrEqual(20);
    expect(FALLBACK_GITHUB_STATS.totalContributions).toBeGreaterThanOrEqual(100);
    expect(FALLBACK_GITHUB_STATS.featuredRepos.length).toBe(4);
    const repoNames = FALLBACK_GITHUB_STATS.featuredRepos.map((r: FeaturedRepo) => r.name);
    expect(repoNames).toContain('IRA');
    expect(repoNames).toContain('AGORA-PROXIMA');
  });

  it('returns fallback snapshot gracefully if GitHub API network call throws', async () => {
    // Force global fetch to fail
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('GitHub API rate limit exceeded'));

    const data = await fetchGitHubTelemetry('DurgaPavan0923');
    expect(data.publicRepos).toBe(FALLBACK_GITHUB_STATS.publicRepos);
    expect(data.featuredRepos.length).toBe(4);
    expect(data.isStale).toBe(true);
  });
});
