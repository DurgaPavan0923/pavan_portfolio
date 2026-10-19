import { NextResponse } from 'next/server';
import { fetchGitHubData } from '@/lib/github';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const data = await fetchGitHubData('DurgaPavan0923');
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('GitHub API route error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve GitHub stats' },
      { status: 500 }
    );
  }
}
