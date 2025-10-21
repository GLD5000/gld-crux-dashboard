import { MetricHistogramKeys } from "../CruxHistoryTypes";

export const SiteHealthSlideKeyLookup: Record<string, MetricHistogramKeys> = {
  lcp: "largest_contentful_paint",
  inp: "interaction_to_next_paint",
  cls: "cumulative_layout_shift",
  fcp: "first_contentful_paint",
  ttfb: "experimental_time_to_first_byte",
  rtt: "round_trip_time",
  // cwv:'core_web_vital',
};
export const SiteHealthSlideKeyReverseLookup: Record<string, string> = {
  largest_contentful_paint: "lcp",
  interaction_to_next_paint: "inp",
  cumulative_layout_shift: "cls",
  first_contentful_paint: "fcp",
  experimental_time_to_first_byte: "ttfb",
  round_trip_time: "rtt",
  // cwv:'core_web_vital',
};

export const pageLifecycleEvents = {
  navigation: {
    key: "navigation",
    order: "1",
    title: "Navigation",
    description:
      "When a user navigates via link, back/forward, reload, prerender.",
  },
  dns_lookup: {
    key: "dns_lookup",
    order: "2",
    title: "DNS Lookup",
    description: "Translate domain name to IP address.",
  },
  establish_connection: {
    key: "establish_connection",
    order: "3",
    title: "Establish Connection",
    description:
      "Connect to the server via TCP and initiate SSL handshake (if HTTPS).",
  },
  http_request: {
    key: "http_request",
    order: "4",
    title: "HTTP Request",
    description: "Browser sends an HTTP request for the webpage and resources.",
  },
  server_response: {
    key: "server_response",
    order: "5",
    title: "Server Response",
    description: "Server processes the request and returns the HTML document.",
  },
  first_byte: {
    key: "first_byte",
    order: "6",
    title: "First Byte",
    description:
      "When the browser receives the first byte of the HTML document response.",
  },
  html_parse: {
    key: "html_parse",
    order: "7",
    title: "HTML Parse & DOM Construction",
    description: "Parse the HTML and build the Document Object Model (DOM).",
  },
  fetch_resources: {
    key: "fetch_resources",
    order: "8",
    title: "Fetch Resources",
    description: "Fetch CSS, JS & Images",
  },
  css_parse: {
    key: "css_parse",
    order: "9",
    title: "CSS Parse",
    description:
      "The browser parses the CSS stylesheets and combines them with the DOM to create the Render Tree, which defines the visual layout of the page.",
  },
  layout: {
    key: "layout",
    order: "10",
    title: "Layout (Reflow)",
    description:
      "The browser calculates the size and position of each element on the page based on the Render Tree. This step might need to be repeated (reflowed) if changes are made to the DOM or CSS.",
  },
  paint: {
    key: "paint",
    order: "11",
    title: "Paint",
    description:
      "The browser renders the visual elements onto the screen according to the Render Tree.",
  },
  first_paint: {
    key: "first_paint",
    order: "12",
    title: "First Paint",
    description: "When the browser first renders pixels to the screen.",
  },
  first_contentful_paint: {
    key: "first_contentful_paint",
    order: "13",
    title: "First Contentful Paint (FCP)",
    description:
      "When the browser renders the first content from the DOM, providing feedback to the user that the page is loading.",
  },
  javascript_execution: {
    key: "javascript_execution",
    order: "14",
    title: "JavaScript Execution",
    description:
      "When JavaScript code (if any) is executed, potentially modifying the DOM or CSSOM (CSS Object Model), which can trigger further reflows or repaints.",
  },
  content_loaded: {
    key: "content_loaded",
    order: "15",
    title: "Content Loaded (DOM Event)",
    description:
      "When the HTML document has been completely parsed, and all deferred scripts (<script defer src=…> and <script type=module>) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.",
  },
  largest_contentful_paint: {
    key: "largest_contentful_paint",
    order: "16",
    title: "Largest Contentful Paint (LCP)",
    description:
      "When the largest image or text block is visible within the viewport.",
  },
  fully_rendered: {
    key: "fully_rendered",
    order: "17",
    title: "Fully Rendered",
    description: "When all page elements are visually rendered.",
  },
  interactive: {
    key: "interactive",
    order: "18",
    title: "Interactive (Quiet Window)",
    description:
      "When the last of the long blocking tasks is complete (followed by >5s quiet window).",
  },
  load: {
    key: "load",
    order: "19",
    title: "Load (DOM Event)",
    description:
      "When the whole page has loaded, including all dependent resources such as stylesheets, scripts, iframes, and images, except those that are loaded lazily.",
  },
  dom_interactions: {
    key: "dom_interactions",
    order: "20",
    title: "DOM Interactions",
    description: "When the user interacts with the page.",
  },
};
export interface metricInfoInterface {
  acronym: string;
  title: string;
  description: string;
  url: string;
  unit: string;
  goodThreshold?: string;
  poorThreshold?: string;
  facts?: string[];
  timelineEvents?: string[];
}
export const metricInfo: Record<string, metricInfoInterface> = {
  cwv: {
    unit: "",
    acronym: "CWV",
    description:
      "Core Web Vitals are the subset of Web Vitals that apply to all web pages, should be measured by all site owners, and will be surfaced across all Google tools. Each of the Core Web Vitals represents a distinct facet of the user experience, is measurable in the field, and reflects the real-world experience of a critical user-centric outcome.",
    title: "Core Web Vitals",
    url: "https://web.dev/articles/vitals#core-web-vitals",
    facts: [
      "Core Web Vitals are the critical metrics for understanding and delivering a great user experience",
      "Core Web Vitals are used by Google in search rankings",
      "Google recommended threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices.",
    ],
  },
  owv: {
    unit: "",
    acronym: "OWV",
    description:
      "While the Core Web Vitals are the critical metrics for understanding and delivering a great user experience, there are other supporting metrics. These other metrics can serve as proxy—or as supplemental metrics for the three Core Web Vitals—to help capture a larger part of the experience or to aid in diagnosing a specific issue.",
    title: "Other Web Vitals",
    url: "https://web.dev/articles/vitals#other-web-vitals",
    facts: [
      "Other Web Vitals are not used by Google in search rankings but contribute to the Core Web Vitals that are",
      "Time to First Byte (TTFB) and First Contentful Paint (FCP) are both vital aspects of the loading experience, useful in diagnosing issues with LCP (slow server response times or render-blocking resources, respectively).",
    ],
  },
  largest_contentful_paint: {
    timelineEvents: [
      pageLifecycleEvents.dns_lookup.key,
      pageLifecycleEvents.largest_contentful_paint.key,
    ],
    goodThreshold: "2500",
    poorThreshold: "4000",
    unit: "ms",
    acronym: "LCP",
    description:
      "Largest Contentful Paint (LCP) measures loading time. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.",
    title: "Largest Contentful Paint",
    url: "https://web.dev/articles/lcp",
    facts: [
      "Core Web Vital (CWV) used by Google in search rankings",
      "Records the loading time for the largest visible element, usually the Hero",
      "Lab results can be impacted by other elements e.g. pop-ups",
    ],
  },
  interaction_to_next_paint: {
    timelineEvents: [
      pageLifecycleEvents.first_contentful_paint.key,
      pageLifecycleEvents.dom_interactions.key,
    ],

    goodThreshold: "200",
    poorThreshold: "500",
    unit: "ms",

    acronym: "INP",
    description:
      "Interaction to Next Paint (INP) measures interactivity delay. To provide a good user experience, pages should have a INP of 200 milliseconds or less.",
    title: "Interaction To Next Paint",
    url: "https://web.dev/articles/inp",
    facts: [
      "Core Web Vital (CWV) used in Google search rankings (SEO)",
      // 'Released in 2024 and succeeds First Input Delay (FID)',
      "Records clicks, taps and key presses (scroll and hover events are not recorded)",
      // 'Records blocking time between interaction and changes to what you see on a page',
      "Measures delay or blocking time between interaction and next frame paint",
      // 'Reports worst interaction on most pages',
      // 'Ignores one outlier per 50 on pages with over 50 interaction targets',
      "Correlates with Total Blocking Time (TBT) which is used as a substitute in lab tests",
    ],
  },
  cumulative_layout_shift: {
    timelineEvents: [
      pageLifecycleEvents.first_paint.key,
      pageLifecycleEvents.load.key,
    ],

    goodThreshold: "0.1",
    poorThreshold: "0.25",
    unit: "",
    acronym: "CLS",
    description:
      "Cumulative Layout Shift (CLS) measures visual instability. To provide a good user experience, pages should maintain a CLS of 0.1 (10%) or less.",
    title: "Cumulative Layout Shift",
    url: "https://web.dev/articles/cls",
    facts: [
      "Core Web Vital (CWV) used in Google search rankings (SEO)",
      "Records shifts in the page as it loads, particularly for slow loading elements",
      "Often impacted by Third Party elements e.g. widgets",
    ],
  },
  first_contentful_paint: {
    timelineEvents: [
      pageLifecycleEvents.dns_lookup.key,
      pageLifecycleEvents.first_contentful_paint.key,
    ],

    goodThreshold: "1800",
    poorThreshold: "3000",
    unit: "ms",
    acronym: "FCP",
    description:
      "First Contentful Paint (FCP) measures the time from when the user first navigated to the page to when any part of the page's content is rendered on the screen.",
    title: "First Contentful Paint",
    url: "https://web.dev/articles/fcp",
    facts: [
      "Measures the load time for the first content users can see",
      "Gives visual feedback that a page is loading",
      "Includes any unload time from the previous page, connection set up time, redirect time, and Time To First Byte (TTFB)",
    ],
  },
  experimental_time_to_first_byte: {
    timelineEvents: [
      pageLifecycleEvents.dns_lookup.key,
      pageLifecycleEvents.first_byte.key,
    ],

    goodThreshold: "800",
    poorThreshold: "1800",
    unit: "ms",

    acronym: "TTFB",
    description:
      "Time to First Byte (TTFB) measures the time between the request for a resource and when the first byte of a response begins to arrive.",
    title: "Time To First Byte",
    url: "https://web.dev/articles/ttfb",
    facts: [
      "Measure all requests, not just page loads (navigation)",
      "TTFB is affected by server request speeds, hosting and CDNs",
      "Impacts other Web Vital events e.g. FCP, LCP because it is included in their processes",
    ],
  },
  round_trip_time: {
    timelineEvents: [
      pageLifecycleEvents.navigation.key,
      pageLifecycleEvents.navigation.key,
    ],

    goodThreshold: "75",
    poorThreshold: "275",
    unit: "ms",
    acronym: "RTT",
    description:
      "Provides an estimate of the HTTP (application layer) round trip time at the start of the navigation, based on recent network connections. N.B. Round trip time is a measure of the users to your site (based on their recent internet activity), and not of the site itself.",
    title: "Round Trip Time",
    url: "https://aws.amazon.com/what-is/rtt-in-networking/",
    facts: [
      "This measures user device connection speed (ping), not the website.",
      "Affected by distance from servers and connection quality (signal)",
    ],
  },
  largest_contentful_paint_image_time_to_first_byte: {
    unit: "ms",

    acronym: "LCP",
    description:
      "The time from when the user initiates loading the page until the browser receives the first byte of the HTML document response.",
    title: "LCP - Time To First Byte (TTFB)",
    url: "https://web.dev/articles/optimize-lcp#optimal_sub-part_times",
  },

  largest_contentful_paint_image_resource_load_delay: {
    unit: "ms",

    acronym: "LCP",
    description:
      "The time between TTFB and when the browser starts loading the LCP resource. If the LCP element doesn't require a resource load to render (for example, if the element is a text node rendered with a system font), this time is 0.",
    title: "LCP - Load Delay",
    url: "https://web.dev/articles/optimize-lcp#optimal_sub-part_times",
  },
  largest_contentful_paint_image_resource_load_duration: {
    unit: "ms",

    acronym: "LCP",
    description:
      "The duration of time it takes to load the LCP resource itself. If the LCP element doesn't require a resource load to render, this time is 0.",
    title: "LCP - Load Duration",
    url: "https://web.dev/articles/optimize-lcp#optimal_sub-part_times",
  },
  largest_contentful_paint_image_element_render_delay: {
    unit: "ms",

    acronym: "LCP",
    description:
      "The time between when the LCP resource finishes loading and the LCP element rendering fully.",
    title: "LCP - Render Delay",
    url: "https://web.dev/articles/optimize-lcp#optimal_sub-part_times",
  },
  total_blocking_time: {
    timelineEvents: [
      pageLifecycleEvents.first_contentful_paint.key,
      pageLifecycleEvents.interactive.key,
    ],

    goodThreshold: "200",
    poorThreshold: "600",
    unit: "ms",
    acronym: "TBT",
    description:
      "Total Blocking Time (TBT) metric measures the total amount of time between First Contentful Paint (FCP) and Time to Interactive (TTI) where the main thread was blocked for long enough to prevent input responsiveness (>50ms).",
    title: "Total Blocking Time",
    url: "https://web.dev/articles/tbt",
    facts: [
      "Any task that executes for more than 50 ms is a long task. The amount of time after 50 ms is the blocking portion. For example, 'blocking time' for a 70 ms long task would be 20 ms.",
    ],
  },
  speed_index: {
    timelineEvents: [
      pageLifecycleEvents.dns_lookup.key,
      pageLifecycleEvents.fully_rendered.key,
    ],

    goodThreshold: "3400",
    poorThreshold: "5800",
    unit: "ms",
    acronym: "SI",
    description:
      "Speed Index measures how quickly content is visually displayed during page load.",
    title: "Speed Index",
    url: "https://developer.chrome.com/docs/lighthouse/performance/speed-index",
  },
};
