import { type Article } from "@prisma/client";
import { Card, CardTitle, CardHeader } from "./ui/card";
import Link from "next/link";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
