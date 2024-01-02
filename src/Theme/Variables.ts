/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export enum Colors {
  TRANSPARENT = "rgba(0,0,0,0)",
  INPUT_BACKGROUND = "#FFFFFF",
  WHITE = "#ffffff",
  GRAY = "#756F6F",
  BACKGROUND = "#F0F0F0",
  TEXT = "#212529",
  PRIMARY = "#57B97D",
  PRIMARY_DARK = "#0E1E22",
  SECONDARY = "#756F6F",
  SUCCESS = "#28a745",
  ERROR = "#dc3545",
  BUTTON = '#0E1E22'
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

export enum OnboardingColors {
  KEYWORD = '#57B97D',
  SUBTITLE = '#756F6F'
}

/**
 * FontSize
 */
export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

export enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}
