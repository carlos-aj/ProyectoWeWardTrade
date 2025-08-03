import { ICard, Card } from "../models/Card";

export async function getCard(id: number) {
    return await Card.query().findById(id);
}

export async function getAllCards() {
    return await Card.query();
}

export async function createCard(card: ICard) {
    return await Card.query().insert(card);
}

export async function updateCard(id: number, card: Partial<ICard>) {
    return await Card.query().patchAndFetchById(id, card);
}

export async function deleteCard(id: number) {
    return await Card.query().deleteById(id);
}