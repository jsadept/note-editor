import {INote} from "../models/INote";

export const sortNotesByDate = (iNotes: INote[]): INote[] => {
    const result = iNotes.sort((a, b) => {
        return a.createDate.getTime() - b.createDate.getTime();
    })
    return result;

};