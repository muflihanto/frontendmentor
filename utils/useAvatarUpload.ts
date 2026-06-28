import { atom, useAtom } from "jotai";
import { useCallback, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const avatarSchema = z
  .custom<FileList | null>()
  .transform((fileList) => (fileList ? fileList[0] : null))
  .refine((file) => file instanceof File, {
    message: "Avatar cannot be empty.",
  })
  .refine(
    (file) => {
      if (!file) return true;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      return allowedTypes.includes(file.type);
    },
    {
      message: "File must be JPG or PNG format.",
    },
  )
  .refine(
    (file) => {
      if (!file) return true;
      return file.size <= 500 * 1024;
    },
    {
      message: "File too large. Please upload a photo under 500KB.",
    },
  );

type TicketState = {
  completed: boolean;
  previewUrl: string | null;
  submittedData: {
    avatar: File | null;
    fullname: string;
    email: string;
    username: string;
  } | null;
  ticketNumber: number | null;
};

export const ticketStateAtom = atom<TicketState>({
  completed: false,
  previewUrl: null,
  submittedData: null,
  ticketNumber: null,
});

export function useAvatarUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ticketState, setTicketState] = useAtom(ticketStateAtom);
  const { previewUrl } = ticketState;
  const [isDragging, setIsDragging] = useState(false);
  const { trigger, resetField } = useFormContext();

  const handleFileChange = useCallback(
    (
      files: FileList | null,
      field: { onChange: (value: FileList | null) => void },
    ) => {
      if (files && files.length > 0) {
        const validation = avatarSchema.safeParse(files);
        if (validation.success) {
          const url = URL.createObjectURL(files[0]);
          setTicketState((prev) => ({ ...prev, previewUrl: url }));
        } else {
          setTicketState((prev) => ({ ...prev, previewUrl: null }));
        }
      } else {
        setTicketState((prev) => ({ ...prev, previewUrl: null }));
      }
      field.onChange(files);
      void trigger("avatar");
    },
    [setTicketState, trigger],
  );

  const handleRemoveImage = useCallback(() => {
    setTicketState((prev) => ({ ...prev, previewUrl: null }));
    resetField("avatar");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setTicketState, resetField]);

  const handleChangeImage = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (
      e: React.DragEvent,
      field: { onChange: (value: FileList | null) => void },
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        if (inputRef.current) {
          inputRef.current.files = dataTransfer.files;
        }
        handleFileChange(dataTransfer.files, field);
      }
    },
    [handleFileChange],
  );

  const dragHandlers = useMemo(
    () => ({
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
    }),
    [handleDragEnter, handleDragLeave, handleDragOver],
  );

  return {
    previewUrl,
    isDragging,
    inputRef,
    handleFileChange,
    handleRemoveImage,
    handleChangeImage,
    handleDrop,
    dragHandlers,
  };
}
