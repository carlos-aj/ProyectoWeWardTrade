import { Model } from 'objection';

export interface ICard {
  id?: number;
  name: string;
  country: string;
  image: Text;
  created_at?: Date;
  updated_at?: Date;
}

export class Card extends Model implements ICard {
  id?: number;
  name!: string;
  country!: string;
  image!: Text;
  created_at?: Date;
  updated_at?: Date;

  static tableName = 'cards';
}
