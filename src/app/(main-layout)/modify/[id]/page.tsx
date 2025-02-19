import { ModifyForm } from './_components/modify-form';
import { fetchCategories } from '@/actions/category-action';
import { fetchPost } from '@/actions/post-action';

const ModifyPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = BigInt((await params).id);

  const data = fetchPost({ id });

  const categories = await fetchCategories();

  return <ModifyForm id={id} data={data} categories={categories} />;
};

export default ModifyPage;
