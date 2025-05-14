import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import CheckIcon from "@/assets/icons/check.svg?react";
import { Button } from "./button";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "success" | "warning";
  description: string;
}

export function AlertDialog({
  open,
  onOpenChange,
  type,
  description,
}: LoginDialogProps) {
  const bgColor = type === "success" ? "bg-urgency-low" : "bg-urgency-high";
  const iconShadow = type === "success" ? "shadow-success" : "shadow-warning";
  const title = type === "success" ? "Success" : "Warning";

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center size-12 ${bgColor} rounded-full mb-4 ${iconShadow}`}
          >
            {type === "success" ? (
              <CheckIcon className="size-6 text-white" />
            ) : (
              <span className="text-white font-bold text-xl">!</span>
            )}
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button
            className={`${bgColor} hover:${bgColor} hover:opacity-100`}
            onClick={handleClose}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
