import { fetchCategories } from '@/actions/category-action';
import { Button } from '@/components';
import Link from 'next/link';

const CommunityLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories = await fetchCategories();

  return (
    <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-12 gap-8">
      <div className="col-span-3 flex flex-col max-md:hidden">
        <h2 className="pb-6 pl-1 text-3xl font-bold">커뮤니티</h2>
        <div className="bg-grey-800 divide-default flex flex-col divide-y overflow-hidden rounded-2xl">
          <Link className="hover:bg-white-50 px-6 py-5" href={'/community'}>
            전체
          </Link>
          {categories.map((category) => (
            <Link
              className="hover:bg-white-50 px-6 py-5"
              key={category.id}
              href={`/community?category=${category.id}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Link className="mt-4" href="/write">
          <Button className="w-full" sort="primary">
            작성하기
          </Button>
        </Link>
      </div>
      <div className="col-span-12 md:col-span-9">{children}</div>
    </div>
  );
};

export default CommunityLayout;
