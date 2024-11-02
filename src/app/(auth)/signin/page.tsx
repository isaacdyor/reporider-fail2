"use client";

import { GitHubSigninButton } from "@/components/github-signin-button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GitHubSigninButton />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t pt-6 text-center text-sm">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline transition-colors hover:text-primary/80"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
