import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases condicionales y resuelve conflictos de Tailwind.
 * `cn("p-2", "p-4")` devuelve "p-4" en vez de dejar ambas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
