import {useCallback, useMemo} from 'react';
import {SimpleMdeReact} from "react-simplemde-editor";
import {marked} from 'marked'
import "easymde/dist/easymde.min.css";
import {Input} from 'antd';

const Workspace = ({currentNoteValue, setCurrentNoteValue, currentNoteTitle, setCurrentNoteTitle, isEditing}: any) => {



    const onChange = useCallback((value: string) => {
        setCurrentNoteValue(value);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    const editorOptions = useMemo(() => {
        return {
            toolbar: false,
            status: false,
            autofocus: true,
            spellChecker: false,
        };
    }, []);



    if(!isEditing){
        return(
            <>
                <h1 className='current-note__title'>{currentNoteTitle}</h1>
                <div dangerouslySetInnerHTML={{__html: marked.parse(currentNoteValue)}} />
            </>
        )
    }

    return (
        <>
            <Input value={currentNoteTitle} onChange={(e) => setCurrentNoteTitle(e.target.value)} type={'text'} className={'input-title'} />
            <SimpleMdeReact
                // events={events}
                value={currentNoteValue}
                onChange={onChange}
                options={editorOptions}
            />
        </>
    );
};

export default Workspace;