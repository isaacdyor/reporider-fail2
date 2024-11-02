// "use client";

import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";
import Link from "next/link";
// import { usePathname } from "next/navigation";
const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
  params: { segment: string };
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex h-16 w-full items-center justify-between px-4 lg:px-24 xl:px-36">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <Card className="w-full max-w-md">{children}</Card>
      </div>
    </div>
  );
};

export default RootLayout;
