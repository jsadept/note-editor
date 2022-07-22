import React, {FC} from 'react';
import {db} from '../db/db';
import {INote} from '../models/INote';
import {getId} from '../utils/getId';
import ContextService from "./ContextService";

interface DbServiceProps{
    children: React.ReactNode;
}


const DbService: FC<DbServiceProps> = ({children}) => {



    const getNotes = async () => {
        const notes = await db.notes.toArray();

        return notes;
    }

    const createNote = async () =>{
        try {
            const currentDate = new Date();
            const currentNote = await db.notes.add({
                id: getId(),
                title: 'New Note',
                content: '',
                lastTimeEdit: currentDate,
                createDate: currentDate,
                shortDescription:'',
            } as INote);
            return currentNote;

        } catch (error) {
            console.log(`Failed to add: ${error}`);
        }

    }

    const updateNote = async ({id, title, content, shortDescription}: INote) =>{
        console.log(shortDescription)
        try {
            const currentDate = new Date();
            const currentNote = await db.notes.update(id || 0, {
                title,
                content: content,
                lastTimeEdit: currentDate,
                shortDescription: shortDescription || ''
            } as INote);
        } catch (error) {
            console.log(`Failed to update: ${error}`);
        }
    }


    const removeNote = async (id: string) =>{
        try {
            await db.notes.delete(id);
        } catch (error) {
            console.log(`Failed to delete: ${error}`);
        }
    }
    return (
        <ContextService {...{getNotes, createNote, updateNote, removeNote}}>
            {children}
        </ContextService>
    );
};

export default DbService;