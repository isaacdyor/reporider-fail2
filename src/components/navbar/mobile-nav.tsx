import { Menu } from "lucide-react";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "../ui/sheet";
import { useState } from "react";
import Link from "next/link";
import { navItems } from ".";
import { NavButtons } from "./nav-buttons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-md p-0 hover:bg-secondary">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col justify-between sm:w-[400px]"
      >
        <VisuallyHidden.Root>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Mobile navigation menu</SheetDescription>
          </SheetHeader>
        </VisuallyHidden.Root>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <NavButtons />
      </SheetContent>
    </Sheet>
  );
}
