import "@/styles/index.css";
import { api } from "@/trpc/server";
import { ProseMirrorRenderer } from "@/components/prose-mirror-renderer";
import { DashboardContentLayout } from "@/components/dashboard-content-layout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await api.articles.getById({ id });

  if (!article) {
    return null;
  }

  return (
    <DashboardContentLayout>
      <article className="prose prose-slate max-w-none p-6">
        <ProseMirrorRenderer content={article.content} />
      </article>
    </DashboardContentLayout>
  );
}
