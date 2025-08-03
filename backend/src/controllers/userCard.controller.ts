import { Request, Response } from "express";

import * as UserCardService from "../services/userCard.service";

export async function getUserCardById(req: Request, res: Response) {
    const userCard = await UserCardService.getUserCardById(Number(req.params.id));
    res.json(userCard);
}

export async function getAllUserCards(req: Request, res: Response) {
    const userCards = await UserCardService.getAllUserCards();
    res.json(userCards);
}

export async function createUserCard(req: Request, res: Response) {
    const userCard = await UserCardService.createUserCard(req.body);
    res.status(201).json(userCard);
}

export async function updateUserCard(req: Request, res: Response) {
    const userCard = await UserCardService.updateUserCard(Number(req.params.id), req.body);
    res.json(userCard);
}

export async function deleteUserCard(req: Request, res: Response) {
    await UserCardService.deleteUserCard(Number(req.params.id));
    res.status(204).send();
}

export async function incrementUserCardQuantity(req: Request, res: Response) {
    const userCard = await UserCardService.incrementUserCardQuantity(Number(req.params.id));
    res.json(userCard);
}

export async function decrementUserCardQuantity(req: Request, res: Response) {
    const userCard = await UserCardService.decrementUserCardQuantity(Number(req.params.id));
    res.json(userCard);
}

export async function unlockUserCard(req: Request, res: Response) {
    const userCard = await UserCardService.unlockUserCard(Number(req.params.id));
    res.json(userCard);
}

