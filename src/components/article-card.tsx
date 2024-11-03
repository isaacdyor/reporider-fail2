import { type Article } from "@prisma/client";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={`/editor/${article.id}`}
        >
          Edit
        </Link>
        <Link className={buttonVariants()} href={`/articles/${article.id}`}>
          View
        </Link>
      </CardContent>
    </Card>
  );
}
