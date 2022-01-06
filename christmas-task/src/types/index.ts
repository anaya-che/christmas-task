interface IOptions<T, U> {
  shape: U[];
  color: U[];
  size: U[];
  favorite: U[];
  count: T[];
  year: T[];
}

interface IToy {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: string,
}

enum ShapeFilter {
  Round = 'шар',
  Bell = 'колокольчик',
  Cone = 'шишка',
  Snowflake = 'снежинка',
  Figurine = 'фигурка',
}

enum ShapeFilterEng {
  'round' = ShapeFilter.Round,
  'bell' = ShapeFilter.Bell,
  'cone' = ShapeFilter.Cone,
  'snowflake' = ShapeFilter.Snowflake,
  'figurine' = ShapeFilter.Figurine,
}

enum ColorFilter {
  White = 'белый',
  Yellow = 'желтый',
  Red = 'красный',
  Blue = 'синий',
  Green = 'зелёный',
}

enum ColorFilterEng {
  'white' = ColorFilter.White,
  'yellow' = ColorFilter.Yellow,
  'red' = ColorFilter.Red,
  'blue' = ColorFilter.Blue,
  'green' = ColorFilter.Green,
}

enum SizeFilter {
  Big = 'большой',
  Medium = 'средний',
  Small = 'малый',
}

enum SizeFilterEng {
  'big' = SizeFilter.Big,
  'medium' = SizeFilter.Medium,
  'small' = SizeFilter.Small,
}

interface ISettings {
  music: string;
  snow: string;
  treeImage: string;
  bgImage: string;
}

export {
  IOptions,
  IToy,
  ShapeFilter,
  ShapeFilterEng,
  ColorFilterEng,
  SizeFilterEng,
  ColorFilter,
  SizeFilter,
  ISettings,
};
