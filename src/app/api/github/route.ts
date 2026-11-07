import { NextResponse } from 'next/server';
import { fetchGitHubTelemetry } from '@/lib/github';

export const dynamic = 'force-dynamic';
export const revalidate = 900; // 15 minutes

export async function GET() {
  try {
    const data = await fetchGitHubTelemetry('DurgaPavan0923');
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('GitHub API route error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve GitHub telemetry' },
      { status: 500 }
    );
  }
}
