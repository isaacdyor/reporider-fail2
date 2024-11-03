import { useDropZone, useFileUpload, useUploader } from "./hooks";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { type ChangeEvent, useCallback } from "react";

export const ImageUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: (file: File) => {
      void uploadFile(file);
    },
  });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void uploadFile(file);
    },
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex min-h-[10rem] items-center justify-center rounded-lg bg-opacity-80 p-8">
        <Loader2 className="text-muted-foreground animate-spin" />
      </div>
    );
  }

  const wrapperClass = cn(
    "flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80",
    draggedInside && "bg-neutral-100",
  );

  return (
    <div
      className={wrapperClass}
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Icon
        name="Image"
        className="mb-4 h-12 w-12 text-black opacity-20 dark:text-white"
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-center text-sm font-medium text-neutral-400 dark:text-neutral-500">
          {draggedInside ? "Drop image here" : "Drag and drop or"}
        </div>
        <div>
          <Button
            disabled={draggedInside}
            onClick={handleUploadClick}
            size="sm"
          >
            <Icon name="Upload" />
            Upload an image
          </Button>
        </div>
      </div>
      <input
        className="h-0 w-0 overflow-hidden opacity-0"
        ref={ref}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
