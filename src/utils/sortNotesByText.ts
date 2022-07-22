import {INote} from "../models/INote";

export const sortNotesByText = (newSortedNotes: INote[], query: string) => {

    const result = newSortedNotes.filter(note => {
        if (note.content.toUpperCase().includes(query.toUpperCase()) || note.title.toUpperCase().includes(query.toUpperCase())) {
            return note;
        }
        return false;
    })

    return result;
};