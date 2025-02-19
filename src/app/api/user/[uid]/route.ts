import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;
    const prisma = new PrismaClient();
    // DB 작업 요청
    const profile = await prisma.profiles.findFirst({
      where: { id: uid },
    });

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) console.log('Error: ', error.stack);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;
    const formData = await request.formData();
    const nickname = formData.get('nickname');
    const image = formData.get('image');

    const supabase = await createClient();
    const prisma = new PrismaClient();

    // 이미지 storage 저장
    let storageImageUrl = null;
    const filePath = `private/k43xo5_0/${Date.now()}_${crypto.randomUUID()}`;

    if (image) {
      const { error } = await supabase.storage
        .from('user_profile')
        .upload(filePath, image);

      if (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
      }

      // string 형식 이미지 url 조회
      const { data } = supabase.storage
        .from('user_profile')
        .getPublicUrl(filePath);

      if (data) storageImageUrl = data;
    }

    // DB 작업 요청
    const prevProfile = await prisma.profiles.findUnique({
      where: { id: uid },
    });

    if (!prevProfile) {
      return NextResponse.json(
        { message: '해당 유저를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const profile = await prisma.profiles.update({
      where: { id: uid },
      data: {
        nickname: nickname?.toString() || prevProfile.nickname,
        profile_img: storageImageUrl?.publicUrl || prevProfile.profile_img,
      },
    });

    console.log(profile);

    return NextResponse.json(
      { message: '유저 정보가 업데이트 되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) console.log('Error: ', error.stack);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
