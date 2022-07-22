import React, {FC, useContext, useEffect, useState} from 'react';
import {AppCtx} from './api/ContextService';
import {INote} from "./models/INote";
import App from "./App";
import {createData, removeData, updateData} from './api/DataService';
import {getTrimmedString} from './utils/getTrimmedString';
import {getNoteById} from "./utils/getNoteById";
import {sortNotesByText} from "./utils/sortNotesByText";
import {sortNotesByDate} from "./utils/sortNotesByDate";


const AppContainer: FC = () => {


    const db = useContext(AppCtx);
    const [notes, setNotes] = useState<INote[]>([]);
    const [sortedNotes, setSortedNotes] = useState<INote[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');



    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [isRemoving, setIsRemoving] = useState<boolean>(false);



    const [currentNoteId, setCurrentNoteId] = useState<string | null | undefined>('');
    const [currentNoteValue, setCurrentNoteValue] = useState<string>('');
    const [currentNoteTitle, setCurrentNoteTitle] = useState<string>('');





    const getNotes = async () => {
        const result = await db?.getNotes() || [];
        return result;
    }


    // init
    useEffect(() => {
        setIsLoading(true);

        getNotes().then((data) => {
            setNotes([...data]);
            setIsEditing(false);
            setIsRemoving(false);
            setIsCreating(false);
            setIsLoading(false);
            return data;
        }).then((data) => setNotes([...data]))
    }, [])



    // sort
    useEffect((propNotes?: INote[] ) => {
        let newSortedNotes = sortNotesByDate(propNotes || notes)
        if(searchQuery) newSortedNotes = sortNotesByText(newSortedNotes, searchQuery)
        setSortedNotes(newSortedNotes);
    }, [notes, searchQuery])




    const createNote = () => {
        setIsLoading(true);
        setIsCreating(true);
        createData(db).then((newItemId) => {
            getNotes()
                .then((data) => {
                    setNotes([...data]);
                    return data;
                })
                .then((data)=>{
                    const currentNote = getNoteById(newItemId, data)


                    setCurrentNoteId(newItemId);
                    setCurrentNoteValue(currentNote.content || '');
                    setCurrentNoteTitle(currentNote.title || '');

                    setIsEditing(true);
                })
            }
        );
    }


    const updateNote = (id: string) => {
        setIsLoading(true);
        updateData(
            db, {
                id: id || currentNoteId,
                title: currentNoteTitle,
                content: currentNoteValue,
                shortDescription: getTrimmedString(currentNoteValue, 8)
            } as INote
        ).then(() => {
            getNotes()
                .then((data) => {
                    setNotes([...data])
                })
                .then(()=>{
                });
        });
    }


    const removeNote = () => {
        removeData(db, currentNoteId).then((i) => {
            getNotes()
                .then((data) => {
                    setNotes([...data])
                })
                .then(() => {
                    changeNote('');
            });
        });
    }

    const changeNote = (newNoteId: string) => {
        if(isEditing){
            updateNote(currentNoteId || '');
        }
        setIsEditing(false);
        setIsRemoving(false);
        setIsCreating(false);
        setIsLoading(false)
        setCurrentNoteId(newNoteId);

        const currentNote = getNoteById(newNoteId, notes)
        setCurrentNoteValue(currentNote.content || '');
        setCurrentNoteTitle(currentNote.title || '');
    }

    const editNote = () => {
        setIsEditing(!isEditing);
        updateNote(currentNoteId || '');
    }

    const saveNote = () => {
        updateNote(currentNoteId || '');
        setIsEditing(false);
    }


    const exportNote = () => {
        const fileData = currentNoteValue;
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = currentNoteTitle + '.txt';
        link.href = url;
        link.click();
    }


    return (
        <App {...{
            sortedNotes,
            searchQuery,
            isLoading,
            setSearchQuery,
            isSearching,
            setIsSearching,
            currentNoteId,
            setCurrentNoteId,
            isEditing,
            setIsEditing,
            setIsSaving,
            setIsRemoving,
            setIsCreating,
            currentNoteValue,
            setCurrentNoteValue,
            currentNoteTitle,
            setCurrentNoteTitle,
            createNote,
            saveNote,
            editNote,
            changeNote,
            removeNote,
            exportNote
        }} />
    );
};

export default AppContainer;