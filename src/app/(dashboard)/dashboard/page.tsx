"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export default function DashboardPage() {
  const { mutate } = api.articles.create.useMutation();

  const onClick = () => {
    mutate({
      title: "hi",
      content: "hello",
    });
  };
  return <Button onClick={onClick}>Hi</Button>;
}
