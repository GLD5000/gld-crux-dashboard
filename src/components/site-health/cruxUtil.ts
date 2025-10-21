export function getTrendStatus(slope: number) {
  const limit = 0.05;
  const isStable =
    (slope > 0 && slope < 0 + limit) || (slope < 0 && slope > 0 - limit);
  const isProgressing = slope <= 0;
  return isStable ? "Stable" : isProgressing ? "Progressing" : "Regressing";
}
export function getDisparityTrendStatus(slope: number) {
  const limit = 1.25;
  const isStable =
    (slope > 0 && slope < 0 + limit) || (slope < 0 && slope > 0 - limit);
  const isProgressing = slope <= 0;
  return isStable ? "Stable" : isProgressing ? "Progressing" : "Regressing";
}
