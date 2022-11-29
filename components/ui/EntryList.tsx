import {Paper,List} from '@mui/material';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { FC, useContext,useMemo,DragEvent } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus;
}


export const EntryList:FC<Props> = ({status}) => {
    
    
    const {entries,updateEntry} = useContext(EntriesContext);
    const {isDragging,endDragging} = useContext(UIContext)
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) ,[entries]);
;

const allowDrop = (event:DragEvent<HTMLDivElement>) => {
    event.preventDefault();

}
const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
}


  return (
    // TODO: aqui haremos drop
    <div
    onDrop={onDropEntry}
    onDragOver={allowDrop}
    className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{height:'calc(100vh - 250px)', overflowY:'scroll',backgroundColor:'transparent',padding:'3px 5px'}}>
            {/* Todo: cambiará dependiendo si estoy haciendo drag o no */}
            <List sx={{opacity: isDragging ? 0.2 : 1,transition: 'all .3s'}}>
                {entriesByStatus.map(entry => (
                    <EntryCard key={entry._id} entry={entry}/>
                ))}

            </List>
        </Paper>
    </div>
  )
}
