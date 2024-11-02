import { type Repository } from "@/types/github";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Link href={`/repos/${repo.name}`}>
      <Card key={repo.name}>
        <CardContent className="pt-6">
          <p>{repo.name}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
