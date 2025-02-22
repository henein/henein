import { CardHeader } from '@/components/card-header';
import { PostIcons } from '@/components/post-icons';
import { getTimeDifference } from '@/utils/time';
import Image from 'next/image';

export interface PostHeaderProps {
  id: number;
  title: string;
  category: string;
  author: string;
  authorImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  counts: {
    likeCount: number;
    viewCount: number;
    commentCount: number;
  };
}

export const PostHeader = async (props: PostHeaderProps) => {
  return (
    <CardHeader className="flex flex-col px-6 py-5">
      <p className="mb-2 text-xs">{props.category}</p>
      <p className="mb-4 font-bold">{props.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {props.authorImageUrl && (
            <Image
              className="border-default relative -left-1 mr-0.5 rounded-full border"
              src={props.authorImageUrl}
              alt="프로필"
              width={24}
              height={24}
            />
          )}
          <p className="text-secondary mr-1 text-xs">{props.author}</p>
          <p
            className="text-secondary text-xs"
            suppressHydrationWarning
          >{` · ${getTimeDifference(props.createdAt)} ${props.createdAt !== props.updatedAt ? '(수정됨)' : ''}`}</p>
        </div>
        <PostIcons counts={props.counts} />
      </div>
    </CardHeader>
  );
};
