export function roundMetrics(value: number) {
  return Math.abs(value) < 1
    ? Math.round(value * 100) // * 0.01
    : Math.round(value);
}
