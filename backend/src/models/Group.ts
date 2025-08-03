import { Model } from 'objection';

export interface IGroup {
    id?: number;
    name: string;
    created_at?: Date;
    updated_at?: Date;
}

export class Group extends Model implements IGroup {
    id?: number;
    name!: string;
    created_at?: Date;
    updated_at?: Date;

    static tableName = 'group';
}