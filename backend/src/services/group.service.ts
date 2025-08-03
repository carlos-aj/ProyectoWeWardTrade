import { IGroup, Group } from "../models/Group";

export async function getGroup(id: number) {
    return await Group.query().findById(id);
}

export async function getAllGroups() {
    return await Group.query();
}

export async function createGroup(group: IGroup) {
    return await Group.query().insert(group);
}

export async function updateGroup(id: number, group: Partial<IGroup>) {
    return await Group.query().patchAndFetchById(id, group);
}

export async function deleteGroup(id: number) {
    return await Group.query().deleteById(id);
}

