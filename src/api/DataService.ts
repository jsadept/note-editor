import {INote} from "../models/INote";


export const createData = async (db: any): Promise<any> => {
    const data = await db?.createNote();
    return data;
}

export const updateData = async (db: any, {id, title, content, shortDescription}: INote) => {
    const data = await db?.updateNote({id, title, content, shortDescription});
    return data;
}

export const removeData = async (db: any, id: string | null | undefined) => {
    const data = await db?.removeNote(id);
    return data;
}