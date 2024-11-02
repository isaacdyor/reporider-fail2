import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";

const appSlug = "540d322c-32f3-4b9b-a18d-9c6a5dd67551";
const orgSlug = "isaac-dyor-d74b42";
const version = "latest";
const endpoint = `https://api.wordware.ai/v1alpha/apps/${orgSlug}/${appSlug}/${version}/runs/wait`;

const responseSchema = z.object({
  outputs: z.object({
    article: z.string(),
  }),
});

export const wordwareRouter = createTRPCRouter({
  getDraft: publicProcedure
    .input(z.object({ commits: z.string().min(1) }))

    .mutation(async ({ input }) => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.WORDWARE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            commits: input.commits,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = (await response.json()) as unknown;
      console.log(json);
      const result = responseSchema.parse(json);
      console.log(result);
      return result.outputs.article;
    }),
});
