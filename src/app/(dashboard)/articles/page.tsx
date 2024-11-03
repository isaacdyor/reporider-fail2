import { ArticleCard } from "@/components/article-card";
import { DashboardContentLayout } from "@/components/dashboard-content-layout";
import { api } from "@/trpc/server";

export default async function ArticlesPage() {
  const articles = await api.articles.getAll();
  return (
    <DashboardContentLayout>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </DashboardContentLayout>
  );
}
