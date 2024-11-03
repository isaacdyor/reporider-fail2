import React, {
  type ButtonHTMLAttributes,
  type HTMLProps,
  forwardRef,
} from "react";

import { cn } from "@/lib/utils";
import { Surface } from "./surface";
import { Button, type ButtonProps } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ToolbarWrapperProps = {
  shouldShowContent?: boolean;
  isVertical?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarWrapper = forwardRef<HTMLDivElement, ToolbarWrapperProps>(
  (
    {
      shouldShowContent = true,
      children,
      isVertical = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const toolbarClassName = cn(
      "text-black inline-flex h-full leading-none gap-0.5",
      isVertical ? "flex-col p-2" : "flex-row p-1 items-center",
      className,
    );

    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    );
  },
);

ToolbarWrapper.displayName = "Toolbar";

export type ToolbarDividerProps = {
  horizontal?: boolean;
} & HTMLProps<HTMLDivElement>;

const ToolbarDivider = forwardRef<HTMLDivElement, ToolbarDividerProps>(
  ({ horizontal, className, ...rest }, ref) => {
    const dividerClassName = cn(
      "bg-neutral-200 dark:bg-neutral-800",
      horizontal
        ? "w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0"
        : "h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0",
      className,
    );

    return <div className={dividerClassName} ref={ref} {...rest} />;
  },
);

ToolbarDivider.displayName = "Toolbar.Divider";

export type ToolbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  tooltip?: string;
  tooltipShortcut?: string[];
  buttonSize?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

const isMac =
  typeof window !== "undefined"
    ? navigator.userAgent.toUpperCase().includes("MAC")
    : false;

const ShortcutKey = ({ children }: { children: string }): JSX.Element => {
  const className =
    "inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-border text-muted-foreground border-b-2";

  if (children === "Mod") {
    return <kbd className={className}>{isMac ? "⌘" : "Ctrl"}</kbd>; // ⌃
  }

  if (children === "Shift") {
    return <kbd className={className}>⇧</kbd>;
  }

  if (children === "Alt") {
    return <kbd className={className}>{isMac ? "⌥" : "Alt"}</kbd>;
  }

  return <kbd className={className}>{children}</kbd>;
};

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    {
      children,
      buttonSize = "icon",
      variant = "ghost",
      className,
      tooltip,
      tooltipShortcut,
      active,
      ...rest
    },
    ref,
  ) => {
    const buttonClass = cn(
      "gap-1 min-w-[2rem] px-2 w-auto text-muted-foreground",
      active &&
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
      className,
    );

    const content = (
      <Button
        className={buttonClass}
        variant={variant}
        size={buttonSize}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    );

    if (tooltip) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent className="flex items-center gap-2">
              <span>{tooltip}</span>
              {tooltipShortcut && (
                <span className="flex items-center gap-0.5">
                  {tooltipShortcut.map((shortcutKey) => (
                    <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
                  ))}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return content;
  },
);

ToolbarButton.displayName = "ToolbarButton";

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
