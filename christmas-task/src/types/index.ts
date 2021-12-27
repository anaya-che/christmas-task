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

enum ColorFilter {
  White = 'белый',
  Yellow = 'желтый',
  Red = 'красный',
  Blue = 'синий',
  Green = 'зелёный',
}

enum SizeFilter {
  Big = 'большой',
  Medium = 'средний',
  Small = 'малый',
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
  ColorFilter,
  SizeFilter,
  ISettings,
};
