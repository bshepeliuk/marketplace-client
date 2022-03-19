import { ICategoriesEntity } from '../entities/types';

export interface ICategory {
  id: number;
  name: string;
}

interface ICategoryEntities {
  [entity: string]: ICategoriesEntity | undefined;
}

export interface ICategoriesData {
  result: number[];
  entities: ICategoryEntities;
}
