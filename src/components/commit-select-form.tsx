"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type Commit } from "@/types/github";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  commits: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface CommitSelectFormProps {
  commits: Commit[];
}

export function CommitSelectForm({ commits }: CommitSelectFormProps) {
  const router = useRouter();
  const { mutate: createArticle, isPending: articlePending } =
    api.articles.create.useMutation({
      onSuccess: (data) => {
        router.push(`/editor/${data.id}`);
      },
    });
  const { mutate: getDraft, isPending: draftPending } =
    api.wordware.getDraft.useMutation({
      onSuccess: (data) => {
        createArticle({
          title: "new blog",
          content: data,
        });
      },
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      commits: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedCommits = commits
      .filter((commit) => data.commits.includes(commit.sha))
      .map((commit) => ({
        title: commit.commit.message,
        files: commit.files,
      }));
    getDraft({ commits: JSON.stringify(selectedCommits) });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="commits"
          render={() => (
            <FormItem>
              {commits.map((commit) => (
                <FormField
                  key={commit.sha}
                  control={form.control}
                  name="commits"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={commit.sha}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(commit.sha)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, commit.sha])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== commit.sha,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {commit.commit.message}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={draftPending || articlePending}
          disabled={draftPending || articlePending}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
