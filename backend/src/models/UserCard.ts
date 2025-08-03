import { Model, RelationMappings } from 'objection';
import { User } from './User';
import { Card } from './Card';

export interface IUserCard {
    id?: number;
    user_id: number;
    card_id: number;
    status: boolean;
    quantity: number;
    created_at?: Date;
    updated_at?: Date;
}

export class UserCard extends Model implements IUserCard {
    id?: number;
    user_id!: number;
    card_id!: number;
    status!: boolean;
    quantity!: number;
    created_at?: Date;
    updated_at?: Date;

    static tableName = 'user_cards';

    static relationMappings: RelationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'user_cards.user_id',
                to: 'users.id',
            },
        },
        card: {
            relation: Model.BelongsToOneRelation,
            modelClass: Card,
            join: {
                from: 'user_cards.card_id',
                to: 'cards.id',
            },
        },
    };
}