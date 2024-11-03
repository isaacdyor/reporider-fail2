import { DashboardContentLayout } from "@/components/dashboard-content-layout";
import { Editor } from "@/components/editor";
import { EditorActions } from "@/components/editor/bottom-bar";
import { api } from "@/trpc/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage({ params }: PageProps) {
  const { id } = await params;
  const article = await api.articles.getById({ id });

  return (
    <DashboardContentLayout rightComponent={<EditorActions />}>
      <Editor content={article?.content ?? ""} />
    </DashboardContentLayout>
  );
}
