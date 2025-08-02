import { Request, Response } from 'express';
import * as FriendshipService from '../services/friendship.service';

export async function getFriendshipByUser(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const friendship = await FriendshipService.getFriendshipByUser(userId);
    res.json(friendship);
}

export async function createFriendship(req: Request, res: Response) {
    const friendshipData = req.body;
    const friendship = await FriendshipService.createFriendship(friendshipData);
    res.status(201).json(friendship);
}

export async function updateFriendship(req: Request, res: Response) {
    const id = Number(req.params.id);
    const friendshipData = req.body;
    const friendship = await FriendshipService.updateFriendship(id, friendshipData);
    res.json(friendship);
}

export async function deleteFriendship(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await FriendshipService.deleteFriendship(id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Friendship not found' });
    }
}

export async function acceptFriendship(req: Request, res: Response) {
    const id = Number(req.params.id);
    const friendship = await FriendshipService.acceptFriendship(id);
    if (friendship) {
        res.json(friendship);
    } else {
        res.status(404).json({ message: 'Friendship not found' });
    }
}

export async function declineFriendship(req: Request, res: Response) {
    const id = Number(req.params.id);
    const friendship = await FriendshipService.declineFriendship(id);
    if (friendship) {
        res.json(friendship);
    } else {
        res.status(404).json({ message: 'Friendship not found' });
    }
}

