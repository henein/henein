import { PrismaClient } from '@prisma/client';
import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

const redis = Redis.fromEnv();
export const config = {
  runtime: 'edge',
};

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('use POST', { status: 405 });
  }
  if (req.headers.get('Content-Type') !== 'application/json') {
    return NextResponse.json({ message: 'must be json' }, { status: 400 });
  }

  const prisma = new PrismaClient();

  const body = await req.json();
  let slug: string | undefined = undefined;
  if ('slug' in body) {
    slug = body.slug;
  }
  if (!slug) {
    return NextResponse.json({ message: 'Slug not found' }, { status: 400 });
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();

  if (ip) {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const isNew = await redis.set(['deduplicate', hash, slug].join(':'), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });

    if (!isNew) {
      return NextResponse.json(null, { status: 202 });
    }
  }

  await prisma.posts.update({
    where: {
      id: Number(slug),
    },
    data: {
      view_count: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(null, { status: 202 });
}
