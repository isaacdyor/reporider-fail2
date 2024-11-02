import { api } from "@/trpc/server";
import "@/styles/index.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await api.articles.getById({ id });

  return (
    <article className="prose prose-slate max-w-none p-6">
      <div
        className="ProseMirror"
        dangerouslySetInnerHTML={{
          __html: article?.content ?? "",
        }}
      />
    </article>
  );
}
