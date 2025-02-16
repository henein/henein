import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // URL에서 쿼리 파라미터 가져오기
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code'); // OAuth 인증 코드
  const next = searchParams.get('next') ?? '/';

  if (code) {
    // Supabase, db 클라이언트 생성
    const supabase = await createClient();
    const prisma = new PrismaClient();

    // 인증 코드로 세션 교환
    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    // 오류가 없다면
    // 1. profiles 테이블에 유저 정보 저장

    if (error)
      return NextResponse.json({ message: error.message }, { status: 500 });

    if (user) {
      try {
        const updateUser = await prisma.profiles.upsert({
          where: {
            id: user.id,
          },
          create: {
            id: user.id,
            created_at: user.created_at,
          },
          update: {},
        });
        console.log(updateUser);
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error: ', error.stack);
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 오류 페이지로 리다이렉트
  return notFound();
}
