import { PostBox } from './_components/post-box';
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

export const PostPage = async ({
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
  });

  if (!post) {
    return notFound();
  }

  const content = generateHTML(post.content as object, editorExtensions);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PostBox
        title={post.title}
        author={post.author_id}
        views={0}
        createdAt={post.created_at.toISOString()}
        content={content}
      />
      {/* <OptionBox data={data} boardId={boardId} />
      <CommentBox data={data} boardId={boardId} /> */}
    </div>
  );
};

export default PostPage;
