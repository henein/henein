import { CommentBox } from './_components/comment-box';
import { PostBox } from './_components/post-box';
import { Button } from '@/components';
import { editorExtensions } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import { generateHTML } from '@tiptap/html';
import { notFound } from 'next/navigation';

// export type CommentType = {
//   comment: string;
//   id: number;
//   modifiedDate: string;
//   tag: string;
//   writerId: number;
//   replyId: number;
//   uid: string;
//   replies?: any;
// };

const PostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  if (!id) {
    return null;
  }

  const prisma = new PrismaClient();

  const post = await prisma.posts.findUnique({
    where: { id: Number(id) },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return notFound();
  }

  const authorProfile = await prisma.profiles.findUnique({
    where: { id: post.author_id },
  });

  const content = generateHTML(post.content as object, editorExtensions);

  return (
    <div className="mx-auto mt-6 flex w-full max-w-5xl flex-col gap-4">
      <PostBox
        title={post.title}
        category={post.categories.name}
        author={authorProfile?.nickname ?? 'Unknown'}
        views={0}
        createdAt={post.created_at.toISOString()}
        content={content}
      />
      <div className="flex justify-between">
        <Button sort="secondary">목록</Button>
        <div className="flex gap-2">
          <Button sort="secondary">수정하기</Button>
          <Button sort="danger" disabled>
            신고하기
          </Button>
        </div>
      </div>
      <CommentBox data />
    </div>
  );
};

export default PostPage;
