import { CardHeader } from '@/components/card-header';
import { PostIcons } from '@/components/post-icons';
import { getTimeDifference } from '@/utils/time';
import Image from 'next/image';

export interface PostHeaderProps {
  title: string;
  category: string;
  author: string;
  authorImageUrl?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export const PostHeader = (props: PostHeaderProps) => {
  return (
    <CardHeader className="flex flex-col px-6 py-5">
      <p className="mb-2 text-xs">{props.category}</p>
      <p className="mb-4 font-bold">{props.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            className="border-default relative -left-1 mr-0.5 rounded-full border"
            src={props.authorImageUrl ?? '/images/dark-defaultImg.svg'}
            alt="프로필"
            width={24}
            height={24}
          />
          <p className="text-secondary mr-1 text-xs">{props.author}</p>
          <p
            className="text-secondary text-xs"
            suppressHydrationWarning
          >{` · ${getTimeDifference(props.createdAt)} ${props.createdAt !== props.updatedAt ? '(수정됨)' : ''}`}</p>
        </div>
        <PostIcons views={0} />
      </div>
    </CardHeader>
  );
};

// const Container = styled.div<{ isScrollDown: boolean }>`
//   position: sticky;
//   top: ${({ isScrollDown }) => (isScrollDown ? '16px' : '88px')};
//   transition: top 0.2s ease-in-out;
//   box-shadow: ${({ theme }) => `0px 4px 8px ${theme.boxShadow}`};
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   border-radius: 16px;
//   min-height: 97px;
//   border-bottom: 1px solid ${(prop) => prop.theme.border};
//   padding: 0 24px;
//   background-color: ${(prop) => prop.theme.cardHeader};
//   backdrop-filter: blur(4px);
//   svg {
//     margin-right: 4px;
//   }
// `;
