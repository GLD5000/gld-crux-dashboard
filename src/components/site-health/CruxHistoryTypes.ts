interface UrlNormalizationDetails {
  originalUrl: string;
  normalizedUrl: string;
}
export interface CollectionPeriod {
  firstDate: DateTypes;
  lastDate: DateTypes;
}
export interface DateTypes {
  year: number;
  month: number;
  day: number;
}
interface NavigationType {
  fractionTimeseries: NavigationFractions;
}
interface NavigationFractions {
  restore: number[];
  back_forward: number[];
  back_forward_cache: number[];
  prerender: number[];
  navigate: number[];
  navigate_cache: number[];
  reload: number[];
}
interface MetricFraction {
  fractionTimeseries: FractionTimeseries;
}
interface FractionTimeseries {
  text: Fractions;
  image: Fractions;
}
interface Fractions {
  fractions: (number | string)[];
}
export interface MetricHistogram {
  histogramTimeseries: HistogramTimes[];
  percentilesTimeseries: {
    p75s: number[];
  };
}
export interface HistogramTimes {
  start: number;
  end?: number;
  densities: (number | string)[];
}

interface MetricHistograms {
  first_contentful_paint: MetricHistogram;
  interaction_to_next_paint: MetricHistogram;
  cumulative_layout_shift: MetricHistogram;
  largest_contentful_paint: MetricHistogram;
  round_trip_time: MetricHistogram;
  experimental_time_to_first_byte: MetricHistogram;
}
export interface MetricPercentiles {
  largest_contentful_paint_image_element_render_delay: MetricPercentile;
  largest_contentful_paint_image_resource_load_delay: MetricPercentile;
  largest_contentful_paint_image_resource_load_duration: MetricPercentile;
  largest_contentful_paint_image_time_to_first_byte: MetricPercentile;
}

export interface MetricAll extends MetricHistograms {
  largest_contentful_paint_image_element_render_delay: MetricPercentile;
  largest_contentful_paint_image_resource_load_delay: MetricPercentile;
  largest_contentful_paint_image_resource_load_duration: MetricPercentile;
  largest_contentful_paint_image_time_to_first_byte: MetricPercentile;
  largest_contentful_paint_resource_type: MetricFraction;
  navigation_types: NavigationType;
}

export type MetricHistogramKeys = keyof MetricHistograms;

interface MetricPercentile {
  percentilesTimeseries: {
    p75s: number[];
  };
}
interface CrUXHistory {
  record: {
    key: {
      formFactor?: string;
      origin: string;
    };
    metrics: MetricHistograms;
    collectionPeriods: CollectionPeriod[];
  };
  urlNormalizationDetails: UrlNormalizationDetails;
}

export type CrUxHistoryJson = CrUXHistory[];
