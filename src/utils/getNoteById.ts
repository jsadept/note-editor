import {INote} from "../models/INote";

export const getNoteById = (id: string, notes: INote[]): INote => {
    const result = notes.find((note: INote) => {
        return note.id === id ? true : false;
    })
    if (result === undefined) return {} as INote
    else return result;
}