import { CommentBox } from './_components/comment-box';
import { PostBox } from './_components/post-box';
import { PostDeleteButton } from './_components/post-delete-button';
import { deletePost } from '@/actions/post-action';
import { Button } from '@/components';
import { createClient } from '@/utils/supabase/server';
import { editorExtensions } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import { generateHTML } from '@tiptap/html';
import Link from 'next/link';
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

const fetchPost = async (id: string) => {
  if (!id) {
    return null;
  }

  const prisma = new PrismaClient();

  const post = await prisma.posts.findUnique({
    where: { id: Number(id), deleted_at: null },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return;
  }

  const authorProfile = await prisma.profiles.findUnique({
    where: { id: post.author_id },
  });

  const content = generateHTML(post.content as object, editorExtensions);

  return {
    ...post,
    authorProfile,
    content,
  };
};

const fetchUserId = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user.id;
};

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const post = await fetchPost((await params).id);

  if (!post) {
    return notFound();
  }

  const userId = await fetchUserId();
  const hasOwn = userId !== null && userId === post.author_id;

  return (
    <div className="flex-auto flex-col gap-4">
      <PostBox
        title={post.title}
        category={post.categories.name}
        author={post.authorProfile?.nickname ?? 'Unknown'}
        authorImageUrl={post.authorProfile?.profile_img ?? undefined}
        views={0}
        createdAt={post.created_at.toISOString()}
        updatedAt={post.updated_at.toISOString()}
        content={post.content}
      />
      <div className="mb-8 mt-4 flex justify-between" suppressHydrationWarning>
        <Link href={`/community?category=${post.category_id}`}>
          <Button sort="secondary">목록</Button>
        </Link>
        {hasOwn ? (
          <div className="flex gap-2">
            <Link href={`/modify/${post.id}`}>
              <Button sort="secondary">수정하기</Button>
            </Link>
            <PostDeleteButton id={post.id} />
          </div>
        ) : (
          <Button sort="danger" disabled>
            신고하기
          </Button>
        )}
      </div>
      <CommentBox data />
    </div>
  );
};

export default PostPage;
