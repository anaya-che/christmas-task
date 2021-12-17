interface IOptions {
  shape: string[];
  color: string[];
  size: string[];
  favorite: string[];
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

enum FavoriteFilter {
  Favorite = 'true',
  Unfavorite = 'false',
}

enum AmountFilter {
  Min = 1,
  Max = 12,
}

enum YearFilter {
  Min = 1940,
  Max = 2020,
}

export {
  IOptions,
  IToy,
  ShapeFilter,
  ColorFilter,
  SizeFilter,
  FavoriteFilter,
  AmountFilter,
  YearFilter,
};
