import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
  const secret =
    request.nextUrl.searchParams.get('secret') ||
    request.headers.get('x-revalidate-secret') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid revalidation secret' },
      { status: 401 }
    );
  }

  const path = request.nextUrl.searchParams.get('path') || '/';

  try {
    revalidatePath('/api/github');
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to revalidate path', details: String(err) },
      { status: 500 }
    );
  }
}
