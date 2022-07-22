import {DeleteOutlined, EditOutlined, FileAddOutlined, SaveOutlined, ShareAltOutlined} from '@ant-design/icons';
import {Button, Row, Tooltip} from 'antd';
import Search from 'antd/lib/input/Search';
import React, {FC} from 'react';

interface INavbarProps{
    isSearching: boolean,
    searchQuery: string,
    setSearchQuery: (e: string) => void,
    setIsSaving: (e: boolean) => void,
    setIsEditing: (e: boolean) => void,
    setIsRemoving: (e: boolean) => void,
    setIsCreating: (e: boolean) => void,
    createNote: () => void;
    editNote: () => void;
    saveNote: () => void;
    removeNote: () => void;
    exportNote: () => void;
}


const Navbar: FC<INavbarProps> = (props) => {

    const {
        isSearching,
        searchQuery,
        setSearchQuery,
        setIsSaving,
        setIsEditing,
        setIsRemoving,
        setIsCreating,
        createNote,
        saveNote,
        editNote,
        removeNote,
        exportNote
    } = props;

    return (
        <Row justify="space-around" align="middle" style={{height: 64}}>
            <div>
                <Tooltip placement="bottom" title={'Create'}>
                    <Button className='navbar-icon' onClick={() => createNote()}  icon={<FileAddOutlined />} size={'middle'} />
                </Tooltip>

                <Tooltip placement="bottom" title={'Edit'}>
                    <Button className='navbar-icon' onClick={() => editNote()} icon={<EditOutlined />} size={'middle'} />
                </Tooltip>

                <Tooltip placement="bottom" title={'Delete'}>
                    <Button className='navbar-icon' onClick={() => removeNote()} icon={<DeleteOutlined />} size={'middle'} />
                </Tooltip>


            </div>

            <div style={{display: 'flex'}}>
                <Tooltip placement="bottom" title={'Save'}>
                    <Button className='navbar-icon' onClick={() => saveNote()} icon={<SaveOutlined />} size={'middle'} />
                </Tooltip>

                <Tooltip placement="bottom" title={'Export'}>
                    <Button className='navbar-icon' onClick={() => exportNote()} icon={<ShareAltOutlined />} size={'middle'}  />
                </Tooltip>

                <Search className='navbar-search' placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} loading={isSearching} />
            </div>
        </Row>
    );
};

export default Navbar;