"use client";

import { GitHubSigninButton } from "@/components/github-signin-button";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Get started with your free account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GitHubSigninButton />
        <p className="px-4 text-center text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link
            href="/terms"
            className="underline transition-colors hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline transition-colors hover:text-primary"
          >
            Privacy Policy
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t pt-6 text-center text-sm">
        <p>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-primary underline transition-colors hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </>
  );
}
