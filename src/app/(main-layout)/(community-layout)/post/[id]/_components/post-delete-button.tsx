'use client';

import { deletePost } from '@/actions/post-action';
import { Button } from '@/components';
import React from 'react';

export const PostDeleteButton = ({ id }: { id: bigint }) => {
  return (
    <Button
      sort="danger"
      onClick={() => {
        if (confirm('정말 삭제하시겠습니까?')) {
          deletePost({ id });
        }
      }}
    >
      삭제하기
    </Button>
  );
};
