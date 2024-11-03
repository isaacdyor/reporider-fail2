import { Icon } from "@/components/ui/icon";
import { Surface } from "@/components/ui/surface";
import { Toolbar } from "@/components/ui/toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel = ({
  onClear,
  onEdit,
  url,
}: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-sm underline"
      >
        {url}
      </a>
      <Toolbar.Divider />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toolbar.Button onClick={onEdit}>
              <Icon name="Pen" />
            </Toolbar.Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toolbar.Button onClick={onClear}>
              <Icon name="Trash2" />
            </Toolbar.Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Surface>
  );
};
