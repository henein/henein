import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | 메무대 시즌2 | 헤네인',
    default: '메무대 시즌2 | 헤네인',
  },
  // description: '',
};

export default function MamudaeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
