import { getCategories } from '@/actions/category-action';
import Link from 'next/link';

const CommunityLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await getCategories()

  return (
    <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-12 gap-8">
      <div className="col-span-3 flex flex-col max-md:hidden">
        <h2 className="text-3xl font-bold">커뮤니티</h2>
        {categories.map((category) => (
          <Link key={category.id} href={`/community?category=${category.id}`}>
            {category.name}
          </Link>
        ))}
      </div>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </div>
  );
};

export default CommunityLayout;
