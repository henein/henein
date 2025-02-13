import { Typography } from '@/components';
import { getTimeDifference } from '@/utils/time';

export interface PostHeaderProps {
  title: string;
  author: string;
  views: number;
  createdAt: string;
}

export const PostHeader = (props: PostHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-xl font-bold">{props.title}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Typography className="mr-1 text-xs" type="secondary">
            {props.author}
          </Typography>
        </div>
        <div className="flex items-center">
          <Typography
            className="mr-3 flex items-center text-xs"
            type="secondary"
            suppressHydrationWarning={true}
          >
            <span className="material-symbols-outlined icon-16">schedule</span>
            {getTimeDifference(props.createdAt)}
          </Typography>
          <Typography className="flex items-center text-xs" type="secondary">
            <span className="material-symbols-outlined icon-16">
              visibility
            </span>
            {props.views}
          </Typography>
        </div>
      </div>
    </div>
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
