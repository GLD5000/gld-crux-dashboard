export type PsiReportCollection = Record<string, PsiReport>;

export interface PsiReport {
  name: string;
  url: string;
  locale: string;
  analysisUTCTimestamp: string;
  mobile: PsiResults;
  desktop: PsiResults;
  originMobile?: PsiResults;
  originDesktop?: PsiResults;
}

export interface PsiResults {
  id: string;
  metrics: PsiMetrics;
  overall_category: PsiCategory;
  initial_url: string;
  audits?: PsiAudits;
  categories?: PsiCategories;
  origin_fallback?: boolean;
}

type PsiAudits = Record<PsiAuditKeys, Audit>;

type PsiAuditKeys =
  | "link-text"
  | "html-xml-lang-mismatch"
  | "total-byte-weight"
  | "lcp-lazy-loaded"
  | "td-has-header"
  | "list"
  | "redirects"
  | "document-title"
  | "cumulative-layout-shift"
  | "first-contentful-paint"
  | "charset"
  | "interactive"
  | "aria-text"
  | "skip-link"
  | "aria-valid-attr-value"
  | "bootup-time"
  | "inspector-issues"
  | "image-redundant-alt"
  | "aria-required-children"
  | "object-alt"
  | "robots-txt"
  | "modern-image-formats"
  | "layout-shifts"
  | "link-in-text-block"
  | "aria-prohibited-attr"
  | "font-size"
  | "aria-hidden-focus"
  | "html-lang-valid"
  | "valid-lang"
  | "frame-title"
  | "aria-deprecated-role"
  | "doctype"
  | "image-size-responsive"
  | "table-duplicate-name"
  | "heading-order"
  | "third-party-summary"
  | "dom-size"
  | "critical-request-chains"
  | "total-blocking-time"
  | "focus-traps"
  | "th-has-data-cells"
  | "link-name"
  | "image-alt"
  | "definition-list"
  | "offscreen-content-hidden"
  | "aria-dialog-name"
  | "image-aspect-ratio"
  | "logical-tab-order"
  | "network-server-latency"
  | "font-display"
  | "unused-javascript"
  | "focusable-controls"
  | "viewport"
  | "structured-data"
  | "paste-preventing-inputs"
  | "meta-refresh"
  | "valid-source-maps"
  | "aria-valid-attr"
  | "duplicated-javascript"
  | "tabindex"
  | "max-potential-fid"
  | "notification-on-start"
  | "td-headers-attr"
  | "input-image-alt"
  | "network-rtt"
  | "crawlable-anchors"
  | "speed-index"
  | "video-caption"
  | "is-on-https"
  | "form-field-multiple-labels"
  | "unsized-images"
  | "label-content-name-mismatch"
  | "uses-responsive-images"
  | "errors-in-console"
  | "aria-toggle-field-name"
  | "aria-meter-name"
  | "uses-passive-event-listeners"
  | "unused-css-rules"
  | "select-name"
  | "final-screenshot"
  | "legacy-javascript"
  | "html-has-lang"
  | "user-timings"
  | "screenshot-thumbnails"
  | "prioritize-lcp-image"
  | "metrics"
  | "listitem"
  | "aria-required-attr"
  | "custom-controls-labels"
  | "deprecations"
  | "dlitem"
  | "diagnostics"
  | "bypass"
  | "aria-progressbar-name"
  | "aria-conditional-attr"
  | "render-blocking-resources"
  | "redirects-http"
  | "button-name"
  | "csp-xss"
  | "use-landmarks"
  | "aria-allowed-attr"
  | "aria-treeitem-name"
  | "target-size"
  | "js-libraries"
  | "aria-tooltip-name"
  | "main-thread-tasks"
  | "http-status-code"
  | "server-response-time"
  | "uses-rel-preconnect"
  | "network-requests"
  | "aria-required-parent"
  | "managed-focus"
  | "label"
  | "uses-long-cache-ttl"
  | "resource-summary"
  | "canonical"
  | "third-party-facades"
  | "aria-input-field-name"
  | "duplicate-id-aria"
  | "first-meaningful-paint"
  | "non-composited-animations"
  | "accesskeys"
  | "script-treemap-data"
  | "empty-heading"
  | "identical-links-same-purpose"
  | "custom-controls-roles"
  | "is-crawlable"
  | "landmark-one-main"
  | "geolocation-on-start"
  | "unminified-css"
  | "mainthread-work-breakdown"
  | "offscreen-images"
  | "meta-description"
  | "third-party-cookies"
  | "input-button-name"
  | "visual-order-follows-dom"
  | "largest-contentful-paint-element"
  | "interactive-element-affordance"
  | "uses-optimized-images"
  | "hreflang"
  | "largest-contentful-paint"
  | "efficient-animated-content"
  | "aria-command-name"
  | "aria-roles"
  | "meta-viewport"
  | "aria-hidden-body"
  | "unminified-javascript"
  | "aria-allowed-role"
  | "no-document-write"
  | "long-tasks"
  | "color-contrast"
  | "uses-text-compression"
  | "table-fake-caption";
interface Audit {
  description?: string;
  score: number | null;
  displayValue?: string;
  metricSavings?: AuditMetricSavings;
}

type AuditMetricSavings = Record<string, number>;

export type PsiCategories = Record<string, PsiCategoryScore>;

interface PsiCategoryScore {
  score: number;
  auditRefs?: AuditRef[];
}

interface AuditRef {
  id: string;
  weight: number;
  group?: string;
  acronym?: string;
}

export type PsiMetrics = Record<PsiMetricKeys, PsiMetricScores>;

export type PsiMetricKeys =
  | "CUMULATIVE_LAYOUT_SHIFT_SCORE"
  | "EXPERIMENTAL_TIME_TO_FIRST_BYTE"
  | "FIRST_CONTENTFUL_PAINT_MS"
  | "INTERACTION_TO_NEXT_PAINT"
  | "LARGEST_CONTENTFUL_PAINT_MS";

export interface PsiMetricScores {
  percentile: number;
  distributions: PsiDistribution[];
  category: PsiCategory;
}

export type PsiCategory = "AVERAGE" | "FAST" | "SLOW";

export interface PsiDistribution {
  min: number;
  max?: number;
  proportion: number;
}
