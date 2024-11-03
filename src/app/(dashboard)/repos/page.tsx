import { DashboardContentLayout } from "@/components/dashboard-content-layout";
import { RepoCard } from "@/components/repo-card";
import { getOctokit } from "@/lib/github";

export default async function DashboardPage() {
  const octokit = await getOctokit();

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    sort: "updated",
  });

  return (
    <DashboardContentLayout>
      <div className="flex flex-col gap-4 p-8">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </DashboardContentLayout>
  );
}
