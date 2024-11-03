import { CommitSelectForm } from "@/components/commit-select-form";
import { DashboardContentLayout } from "@/components/dashboard-content-layout";
import { getOctokit } from "@/lib/github";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function RepoPage({ params }: PageProps) {
  const { name } = await params;
  const { user } = await getUser();

  const username = user?.user_metadata.user_name as string | undefined;

  if (!username) {
    redirect("/signin");
  }

  const octokit = await getOctokit();

  const { data: repo } = await octokit.rest.repos.get({
    owner: username,
    repo: name,
  });

  const { data: commits } = await octokit.rest.repos.listCommits({
    owner: username,
    repo: name,
  });

  const commitsWithPatches = await Promise.all(
    commits.map((commit) =>
      octokit.rest.repos
        .getCommit({
          owner: username,
          repo: name,
          ref: commit.sha,
        })
        .then((response) => response.data),
    ),
  );

  return (
    <DashboardContentLayout>
      <div>
        <h1 className="text-2xl font-bold">{repo.name}</h1>
        <CommitSelectForm commits={commitsWithPatches} />
      </div>
    </DashboardContentLayout>
  );
}
