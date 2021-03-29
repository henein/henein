import React from 'react';
import { Card } from '../atoms/Card';
import { CardTitle } from '../atoms/CardTitle';

export interface PostProps {
  title: string;
  content: string;
}

export const Post: React.FC<PostProps> = (props) => {
  return (
    <Card>
      <CardTitle>{props.title}</CardTitle>
      <p>{props.content}</p>
    </Card>
  );
};
