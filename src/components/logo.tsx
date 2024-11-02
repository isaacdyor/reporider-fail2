import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return <p className={cn("text-2xl font-bold", className)}>RepoRider</p>;
}
