import {List} from 'antd';
import React, {FC} from 'react';
import {INote} from "../models/INote";

interface ISidebar{
    sortedNotes: INote[];
    currentNoteId: string | null | undefined;
    changeNote: (id: string) => void;
}

const Sidebar: FC<ISidebar> = ({sortedNotes, currentNoteId, changeNote}) => {

    const ONE_HOUR = 60 * 60 * 1000; /* ms */
    const TWELVE_HOUR = ONE_HOUR * 12; /* ms */

    const NOW = new Date();


    const isDayAgo = (item: any) =>{
        const result = (NOW.getTime() - item.lastTimeEdit.getTime())
        if(result > TWELVE_HOUR) return true
        return false
    }

    const clickHandler = (id: string) => {
        changeNote(id)
    }

    return (
        <div >
            <List
                dataSource={[...sortedNotes]}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        className={currentNoteId === item.id ? 'list-item list-item_current' : 'list-item'}
                        onClick={()=> clickHandler(item.id || '')}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={<div><div>{ (isDayAgo(item)) ? item.lastTimeEdit?.toDateString() : `${item.lastTimeEdit?.getHours()}:${item.lastTimeEdit?.getMinutes()}`  }</div><div>{item.shortDescription}</div></div>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Sidebar;