import Dexie, {Table} from 'dexie';
import {INote} from '../models/INote';

export class MySubClassedDexie extends Dexie {
    notes!: Table<INote>;

    constructor() {
        super('notesDatabase');
        this.version(1).stores({
            notes: '++id, title, createDate, lastTimeEdit, shortDescription, content' // Primary key and indexed props
        });
    }
}

export const db = new MySubClassedDexie();