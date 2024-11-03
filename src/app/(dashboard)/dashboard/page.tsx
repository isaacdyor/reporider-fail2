"use client";

import { DashboardContentLayout } from "@/components/dashboard-content-layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardContentLayout>
      <Link className={buttonVariants()} href="/repos">
        Create article
      </Link>
    </DashboardContentLayout>
  );
}
