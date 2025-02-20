import { CommentBox } from './_components/comment-box';
import { PostBox } from './_components/post-box';
import { PostDeleteButton } from './_components/post-delete-button';
import { deletePost } from '@/actions/post-action';
import { Button } from '@/components';
import { createClient } from '@/utils/supabase/server';
import { editorExtensions } from '@/utils/tiptap';
import { PrismaClient } from '@prisma/client';
import { generateHTML } from '@tiptap/html';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const fetchPost = async (id: string) => {
  if (!id) {
    return null;
  }

  const prisma = new PrismaClient();

  const post = await prisma.posts.findUnique({
    where: { id: Number(id), deleted_at: null },
    include: {
      categories: true,
      _count: { select: { comments: true } },
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

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await fetchPost((await params).id);

  return {
    title: `${post?.title} | ${post?.categories.name}`,
    description: post?.content.slice(0, 100) ?? '',
  };
}

const PostPage = async ({ params }: Props) => {
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
        commentCount={post._count.comments}
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
      <CommentBox postId={post.id} />
    </div>
  );
};

export default PostPage;
