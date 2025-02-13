"use server";

import { createClient } from "@/utils/supabase/server";
import { editorExtensions } from "@/utils/tiptap";
import { PrismaClient } from "@prisma/client";
import { generateText } from "@tiptap/react";
import { redirect } from "next/navigation";
import { z } from "zod";

const WritePostOption = z.object(
  {
    title: z.string().trim().min(2, "제목이 너무 짧아요!").max(
      100,
      "제목이 너무 길어요!",
    ),
    content: z.string().refine(
      (val) => {
        const plainText = generateText(JSON.parse(val), editorExtensions);
        return plainText.length > 10;
      },
      "내용이 너무 짧아요!",
    ),
    category_id: z.string(),
  },
);

export async function writePost(option: z.infer<typeof WritePostOption>) {
  const validOption = WritePostOption.parse(option);

  const supabase = await createClient();
  const prisma = new PrismaClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const category = await prisma.categories.findUnique({
    where: { id: validOption.category_id },
  });

  if (!category) {
    throw new Error("카테고리를 찾을 수 없습니다.");
  }

  const post = await prisma.posts.create({
    data: {
      title: validOption.title,
      author_id: user.id,
      category_id: validOption.category_id,
      content: validOption.content,
    },
  });

  if (!post) {
    throw new Error("게시글 작성에 실패했습니다.");
  }

  redirect(`/post/${post.id}`);
}
