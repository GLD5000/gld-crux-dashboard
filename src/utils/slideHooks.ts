import { useQueryParams } from "./searchParamsURL";

export function useSlideKey() {
  return useQueryParams("sk", "cwv");
}
export function useSize() {
  return useQueryParams("size", "mb");
}
export function useViewMode() {
  return useQueryParams("view", "All");
}
