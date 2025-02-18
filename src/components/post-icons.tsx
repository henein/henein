import React from 'react';

export interface PostIconsProps {
  views: number;
}

export const PostIcons = (props: PostIconsProps) => {
  return (
    <div suppressHydrationWarning className="flex items-center">
      <p className="text-secondary flex items-center text-xs">
        <span className="material-symbols-outlined icon-16 mr-1 text-xl">
          visibility
        </span>
        {props.views}
      </p>
    </div>
  );
};
