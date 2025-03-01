import { AccountButton } from './account-button';
import { NavigationItem } from './navigation-item';
import Link from 'next/link';

export const MamudaeHeader = () => {
  return (
    <header>
      <div className="max-[66rem]:px-4 mx-auto mt-6 flex max-w-5xl items-center">
        <div className="mx-auto flex w-full items-center justify-between">
          <div className="flex items-end gap-3">
            <Link href="/">
              <svg
                className="fill-brand dark:fill-white-900"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <path d="M32.6801 16.9635C31.9769 16.3245 31.2433 15.4481 30.4277 14.495L26.4261 18.2039L34.6917 25.8645L24.427 19.6961L14.1624 25.8645L22.428 18.2039L14.1624 10.5434L24.427 16.7118L29.6352 13.5812C27.2703 10.9004 24.1914 8 19.3849 8C12.2526 8 10.159 14.1827 7.33003 16.7582C6.25912 17.7345 3 19.7121 3 23.7673C3 26.1376 4.11017 28.3758 6.02888 29.4609C7.33003 30.1963 8.21174 30.5854 10.2465 30.7228C12.4739 30.8728 15.4689 31.1066 19.3849 31.1066C23.3008 31.1066 26.2958 30.8728 28.5232 30.7228C30.558 30.5854 32.1536 30.1963 33.4548 29.4609C35.3735 28.3758 36.4836 26.1376 36.4836 23.7673C36.4836 19.7121 33.751 17.9398 32.6784 16.9653L32.6801 16.9635Z" />
              </svg>
            </Link>
            <div className="flex items-center">
              <Link href="/mamudae/prize">
                <NavigationItem>상금</NavigationItem>
              </Link>
              <Link href="/mamudae/boss">
                <NavigationItem>보스</NavigationItem>
              </Link>
              {/* <Link href="/mamudae/record"> */}
                <NavigationItem isWIP>기록</NavigationItem>
              {/* </Link> */}
              <Link href="/community">
                <NavigationItem>커뮤니티</NavigationItem>
              </Link>
            </div>
          </div>
        <AccountButton />
        </div>
      </div>
    </header>
  );
};
