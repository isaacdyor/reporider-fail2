"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <Link className={buttonVariants()} href="/repos">
      Create article
    </Link>
  );
}
