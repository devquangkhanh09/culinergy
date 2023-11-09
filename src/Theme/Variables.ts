export enum Colors {
  TRANSPARENT = 'rgba(0,0,0,0)',
  INPUT_BACKGROUND = '#FFFFFF',
  WHITE = '#ffffff',
  BLACK = '#000000',
  TEXT = '#212529',
  PRIMARY = '#E14032',
  SUCCESS = '#28a745',
  ERROR = '#dc3545',
  BACKGROUND_COLOR = '#F0F0F0',
  GREEN = '#57B97D',
  SUBTITLE = '#756F6F',
}

export enum NavigationColors {
  PRIMARY = Colors.PRIMARY,
}

export enum FontSize {
  SMALL = 16,
  REGULAR = 20,
  LARGE = 40,
}

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
