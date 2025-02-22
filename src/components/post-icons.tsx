import React from 'react';

export interface PostIconsProps {
  counts: {
    commentCount: number;
    viewCount: number;
    likeCount: number;
  };
}

export const PostIcons = (props: PostIconsProps) => {
  return (
    <div suppressHydrationWarning className="flex items-center gap-5">
      <p className="text-secondary flex items-center text-xs">
        <span className="icon icon-16 mr-1">comment</span>
        {props.counts.commentCount}
      </p>
      <p className="text-secondary flex items-center text-xs">
        <span className="icon icon-16 mr-1">visibility</span>
        {props.counts.viewCount}
      </p>
      <p className="text-secondary flex items-center text-xs">
        <span className="icon icon-16 mr-1">favorite</span>
        {props.counts.likeCount}
      </p>
    </div>
  );
};
