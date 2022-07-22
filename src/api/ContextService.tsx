import React, {FC} from 'react';
import {INote} from '../models/INote';
import {IndexableType} from "dexie";


interface AppContextInterface{
    getNotes: () => Promise<INote[]>;
    createNote: () => Promise<IndexableType | undefined>;
    updateNote: ({ id, title, content, shortDescription }: INote) => Promise<void>;
    removeNote: (id: string) => Promise<void>;
    children?: React.ReactNode;
}
export const AppCtx = React.createContext<AppContextInterface | undefined>(undefined);



const ContextService: FC<AppContextInterface> = (props) => {
    return (
        <AppCtx.Provider value={props}>
            {props.children}
        </AppCtx.Provider>
    );
};

export default ContextService;