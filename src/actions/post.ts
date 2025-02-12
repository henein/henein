'use server';

import { Json } from '@/utils/supabase/database.types';
import { createPrivateClient } from '@/utils/supabase/server';

export type WritePostOption = {
  title: string;
  content: Json;
  category_id: string;
};

export async function writePost(option: WritePostOption) {
  const supabase = await createPrivateClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('로그인이 필요합니다.');
  }

  const category = await supabase
    .schema('henein')
    .from('categories')
    .select()
    .eq('id', option.category_id);

  if (category.error) {
    throw new Error('카테고리를 찾을 수 없습니다.');
  }

  const post = await supabase
    .schema('henein')
    .from('posts')
    .insert({
      title: option.title,
      author_id: user.id,
      category_id: option.category_id,
      content: option.content,
    })
    .select();

  if (post.error) {
    throw new Error(post.error.message);
  }

  return post.data[0];
}
