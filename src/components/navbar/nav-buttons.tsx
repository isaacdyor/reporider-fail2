import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Link
        href="/signin"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "flex w-full gap-2 border md:hover:border-muted-foreground/50 dark:md:hover:border-border",
        )}
      >
        Sign in
      </Link>
      <Link href="/signup" className={cn(buttonVariants(), "w-full")}>
        Get started
      </Link>
    </div>
  );
};
