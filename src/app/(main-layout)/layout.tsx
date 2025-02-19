import { MamudaeLayout } from '@/components';
import QueryProvider from '@/utils/query/QueryProvider';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <div id="portal" />
      <MamudaeLayout>{children}</MamudaeLayout>
    </QueryProvider>
  );
}
