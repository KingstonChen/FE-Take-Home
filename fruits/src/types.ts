export interface Fruit {
  id: number;
  name: string;
  order: string;
  family: string;
  genus: string;
  calories: number;
}

export interface FruitGroup {
  name: string;
  fruits: Fruit[];
}

export interface JarItem {
  id: number;
  name: string;
  calories: number;
  count: number;
}
