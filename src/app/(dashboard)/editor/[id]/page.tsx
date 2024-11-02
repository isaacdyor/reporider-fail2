import { Editor } from "@/components/editor";
import { api } from "@/trpc/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage({ params }: PageProps) {
  const { id } = await params;
  const article = await api.articles.getById({ id });

  return <Editor content={article?.content ?? ""} />;
}
