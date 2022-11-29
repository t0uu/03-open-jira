import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext,EntriesReducer } from './';

export interface EntriesState{
entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
entries: [
    {
        _id: uuidv4(),
        description: 'Pendiente: lorem',
        status: 'pending',
        createdAt: Date.now(),
    },
    {
        _id: uuidv4(),
        description: 'In-progress: lorem alsdlzxopcjmaiojwepdw',
        status: 'in-progress',
        createdAt: Date.now() - 100000000,
    },
    {
        _id: uuidv4(),
        description: 'Finished: lorem alsdlzxclasdpwep',
        status: 'finished',
        createdAt: Date.now() - 100000 ,
    }
],
}


export const EntriesProvider:FC<PropsWithChildren> = ({children}) => {
const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

const addNewEntry = (description: string) => {
const newEntry:Entry = {
    _id: uuidv4(),
    description: description,
    createdAt: Date.now(),
    status: 'pending'
}

dispatch({type:'[Entry] Add-Entry',payload: newEntry})
}

const updateEntry = (entry: Entry) => {
    dispatch({type:'[Entry] Entry-Updated',payload: entry});
}

return (
<EntriesContext.Provider value={{
...state,
// Methods
addNewEntry,
updateEntry,
}}>
{children}
</EntriesContext.Provider>
);
}



