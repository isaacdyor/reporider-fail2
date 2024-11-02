import { redirect } from "next/navigation";
import { Octokit } from "octokit";
import { getSession } from "./supabase/server";

let octokitInstance: Octokit | null = null;

export const getOctokit = async (): Promise<Octokit> => {
  const { session } = await getSession();

  if (!session?.provider_token) {
    redirect("/signin");
  }

  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: session.provider_token,
    });
  }
  return octokitInstance;
};
