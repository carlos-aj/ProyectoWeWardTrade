import { Request, Response } from "express";

import * as GroupService from "../services/group.service";

export async function getGroup(req: Request, res: Response) {
    const group = await GroupService.getGroup(Number(req.params.id));
    res.json(group);
}

export async function getAllGroups(req: Request, res: Response) {
    const groups = await GroupService.getAllGroups();
    res.json(groups);
}

export async function createGroup(req: Request, res: Response) {
    const group = await GroupService.createGroup(req.body);
    res.status(201).json(group);
}

export async function updateGroup(req: Request, res: Response) {
    const group = await GroupService.updateGroup(Number(req.params.id), req.body);
    res.json(group);
}

export async function deleteGroup(req: Request, res: Response) {
    await GroupService.deleteGroup(Number(req.params.id));
    res.status(204).send();
}
