import { Request, Response } from "express";

import * as CardService from "../services/card.service";

export async function getCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id, 10);
    try {
        const card = await CardService.getCard(cardId);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving card", error });
    }
}

export async function getAllCards(req: Request, res: Response) {
    try {
        const cards = await CardService.getAllCards();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cards", error });
    }
}

export async function createCard(req: Request, res: Response) {
    const cardData = req.body;
    try {
        const newCard = await CardService.createCard(cardData);
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: "Error creating card", error });
    }
}

export async function updateCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id, 10);
    const cardData = req.body;
    try {
        const updatedCard = await CardService.updateCard(cardId, cardData);
        if (!updatedCard) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: "Error updating card", error });
    }
}

export async function deleteCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id, 10);
    try {
        await CardService.deleteCard(cardId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting card", error });
    }
}
