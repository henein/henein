import { MamudaeLayout } from "@/components";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MamudaeLayout>{children}</MamudaeLayout>;
}
