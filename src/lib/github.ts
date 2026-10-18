export interface GitHubStats {
  publicRepos: number;
  totalCommits: number;
  followers: number;
  featuredRepos: {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
  }[];
}

export const FALLBACK_GITHUB_STATS: GitHubStats = {
  publicRepos: 22,
  totalCommits: 141,
  followers: 22,
  featuredRepos: [
    {
      name: 'AI-Powered-Fake-News-Detector-for-Students',
      description: 'NLP and machine learning ensemble pipeline classifying misinformation with feature explainability layer.',
      language: 'TypeScript',
      stars: 18,
      forks: 5,
      url: 'https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector-for-Students',
    },
    {
      name: 'AI-Resume-Screening-Job-Match-System',
      description: 'NLP document parser ranking candidate resumes against job descriptions using TF-IDF and semantic matching.',
      language: 'Python',
      stars: 15,
      forks: 5,
      url: 'https://github.com/DurgaPavan0923/AI-Resume-Screening-Job-Match-System',
    },
    {
      name: 'IRA',
      description: 'An AI-powered 3D urban planning and predictive municipal resource load-balancing architecture.',
      language: 'TypeScript',
      stars: 12,
      forks: 4,
      url: 'https://github.com/DurgaPavan0923/IRA',
    },
    {
      name: 'AGORA-PROXIMA',
      description: 'AI-driven governance and petition routing platform utilizing greedy heuristics and smart contracts.',
      language: 'JavaScript',
      stars: 8,
      forks: 2,
      url: 'https://github.com/DurgaPavan0923/AGORA-PROXIMA',
    },
  ],
};

export async function fetchGitHubData(username = 'DurgaPavan0923'): Promise<GitHubStats> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Pavan-Portfolio-v2',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, commitsRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/search/commits?q=author:${username}`, {
        headers: { ...headers, Accept: 'application/vnd.github.cloak-preview+json' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    const userData = userRes.ok ? await userRes.json() : null;
    const commitsData = commitsRes.ok ? await commitsRes.json() : null;
    const reposData = reposRes.ok ? await reposRes.json() : null;

    const featuredRepoNames = [
      'AI-Powered-Fake-News-Detector-for-Students',
      'AI-Resume-Screening-Job-Match-System',
      'IRA',
      'AGORA-PROXIMA',
    ];

    const featured = Array.isArray(reposData)
      ? reposData
          .filter((r: { name: string }) => featuredRepoNames.includes(r.name))
          .map((r: { name: string; description: string; language: string; stargazers_count: number; forks_count: number; html_url: string }) => ({
            name: r.name,
            description: r.description || 'AI/ML Engineering repository by DurgaPavan0923.',
            language: r.language || 'Python',
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            url: r.html_url,
          }))
      : FALLBACK_GITHUB_STATS.featuredRepos;

    return {
      publicRepos: userData?.public_repos ?? FALLBACK_GITHUB_STATS.publicRepos,
      totalCommits: commitsData?.total_count ?? FALLBACK_GITHUB_STATS.totalCommits,
      followers: userData?.followers ?? FALLBACK_GITHUB_STATS.followers,
      featuredRepos: featured.length > 0 ? featured : FALLBACK_GITHUB_STATS.featuredRepos,
    };
  } catch (err) {
    console.warn('Failed to fetch real-time GitHub data, using fallback:', err);
    return FALLBACK_GITHUB_STATS;
  }
}
