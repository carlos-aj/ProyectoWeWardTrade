import { IFriendship, Friendship } from "../models/Friendship";

export async function getFriendshipByUser(userId: number): Promise<Friendship | null> {
    const friendship = await Friendship.query()
        .where('user_id', userId)
        .first();
    return friendship ?? null;
}

export async function createFriendship(friendshipData: IFriendship): Promise<Friendship> {
    return await Friendship.query().insert(friendshipData);
}

export async function updateFriendship(id: number, friendshipData: Partial<IFriendship>): Promise<Friendship | null> {
    const friendship = await Friendship.query().patchAndFetchById(id, friendshipData);
    return friendship ?? null;
}

export async function deleteFriendship(id: number): Promise<boolean> {
    const result = await Friendship.query().deleteById(id);
    return result > 0;
}

export async function acceptFriendship(id: number): Promise<Friendship | null> {
    const friendship = await Friendship.query().findById(id);
    if (friendship) {
        friendship.status = 'accepted';
        await friendship.$query().patch();
        return friendship;
    }
    return null;
}

export async function declineFriendship(id: number): Promise<Friendship | null> {
    const friendship = await Friendship.query().findById(id);
    if (friendship) {
        friendship.status = 'declined';
        await friendship.$query().patch();
        return friendship;
    }
    return null;
}
