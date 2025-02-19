import React from 'react';

export interface PostIconsProps {
  views: number;
}

export const PostIcons = (props: PostIconsProps) => {
  return (
    <div suppressHydrationWarning className="flex items-center">
      <p className="text-secondary flex items-center text-xs">
        <span className="icon icon-16 mr-1">
          comment
        </span>
        {props.views}
      </p>
    </div>
  );
};
