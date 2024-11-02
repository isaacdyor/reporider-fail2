import { ArticleCard } from "@/components/article-card";
import { api } from "@/trpc/server";

export default async function ArticlesPage() {
  const articles = await api.articles.getAll();
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
