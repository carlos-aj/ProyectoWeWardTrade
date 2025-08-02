import { Model, RelationMappings } from 'objection';
import { User } from './User';

export interface IFriendship {
    user_id?: number;
    friend_id?: number;
    status?: 'pending' | 'accepted' | 'declined';
    created_at?: Date;
    updated_at?: Date;
}

export class Friendship extends Model implements IFriendship {
    user_id?: number;
    friend_id?: number;
    status?: 'pending' | 'accepted' | 'declined';
    created_at?: Date;
    updated_at?: Date;

    static tableName = 'friendships';

    static relationMappings: RelationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'friendships.user_id',
                to: 'users.id',
            },
        },
        friend: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'friendships.friend_id',
                to: 'users.id',
            },
        },
    };
}