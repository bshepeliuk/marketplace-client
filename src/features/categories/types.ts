export interface ICategory {
  id: number;
  name: string;
}

export type CategoryEntities = {
  categories: Record<string, ICategory>;
};

export interface ICategoriesData {
  result: number[];
  entities: CategoryEntities;
}

export interface ICategoryData {
  result: number;
  entities: CategoryEntities;
}
