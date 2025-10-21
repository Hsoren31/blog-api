import { format, formatDistanceToNow } from "date-fns";

export function formatLongDate(date) {
  //Oct 21st, 2025 8:01 a.m.
  return format(date, "MMM do, yyyy h:mm aaaa");
}

export function formatShortDate(date) {
  //Oct 21st
  return format(date, "MMM do");
}

export function formatDateDistance(date) {
  //22 days ago, 6 months ago, about 1 hour ago....
  return formatDistanceToNow(date, { includeSeconds: true, addSuffix: true });
}
