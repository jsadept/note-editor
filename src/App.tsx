import React, {FC} from 'react';
import './App.css';
import {Layout} from "antd";
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar';
import Workspace from "./components/Workspace";
import {INote} from "./models/INote";

interface AppInterface {
    sortedNotes: INote[],
    searchQuery: string,
    setSearchQuery: (value: string) => void,
    isSearching: boolean,
    setIsSearching: (value: boolean) => void,
    currentNoteId: string | null | undefined,
    setCurrentNoteId: (value: string | null | undefined) => void,
    isEditing: boolean,
    setIsEditing: (value: boolean) => void,
    setIsSaving: (value: boolean) => void,
    setIsRemoving: (value: boolean) => void,
    setIsCreating: (value: boolean) => void,
    setCurrentNoteValue: (value: string) => void,
    setCurrentNoteTitle: (value: string) => void,
    currentNoteValue: string;
    currentNoteTitle: string;
    createNote: () => void;
    editNote: () => void;
    saveNote: () => void;
    changeNote: (value: string) => void;
    removeNote: () => void;
    exportNote: () => void;
}

const App: FC<AppInterface> = (props) => {

    return (
        <div className="App">
            <Layout>
                <Layout.Header className='header'>
                    <Navbar {...props}/>
                </Layout.Header>

                <Layout style={{height: 'calc(100vh - 64px)'}}>

                    <Layout.Sider width={250} className='sidebar'>
                        <Sidebar {...props}/>
                    </Layout.Sider>

                    <Layout.Content>
                        <Workspace {...props}/>
                    </Layout.Content>

                </Layout>

            </Layout>
        </div>
    );
}

export default App;
