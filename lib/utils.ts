import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function shortenId(id: string) {
  return id.slice(0, 3) + "..." + id.slice(-3);
}

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0].message;
  }
  return error instanceof Error ? error.message : "Something went wrong";
}
