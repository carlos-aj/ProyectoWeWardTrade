import { IUserCard, UserCard } from "../models/UserCard";

export async function getUserCardById(id: number): Promise<UserCard | null> {
    const userCard = await UserCard.query().findById(id);
    return userCard ?? null;
}

export async function getAllUserCards(): Promise<UserCard[]> {
    return await UserCard.query();
}

export async function updateUserCard(id: number, userCardData: Partial<IUserCard>): Promise<UserCard | null> {
    const userCard = await UserCard.query().patchAndFetchById(id, userCardData);
    return userCard ?? null;
}

export async function deleteUserCard(id: number): Promise<boolean> {
    const result = await UserCard.query().deleteById(id);
    return result > 0;
}

export async function createUserCard(userCardData: IUserCard): Promise<UserCard> {
    return await UserCard.query().insert(userCardData);
}

export async function incrementUserCardQuantity(id: number): Promise<UserCard | null> {
    const userCard = await UserCard.query().findById(id);
    if (!userCard) return null;

    userCard.quantity += 1;
    await userCard.$query().patch();

    return userCard;
}

export async function decrementUserCardQuantity(id: number): Promise<UserCard | null> {
    const userCard = await UserCard.query().findById(id);
    if (!userCard) return null;

    userCard.quantity -= 1;
    await userCard.$query().patch();

    return userCard;
}

export async function unlockUserCard(id: number): Promise<UserCard | null> {
    const userCard = await UserCard.query().findById(id);
    if (!userCard) return null;

    userCard.status = true;
    await userCard.$query().patch();
    userCard.quantity = 1; 
    return userCard;
}