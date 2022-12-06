import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext,EntriesReducer } from './';
import { entriesApi } from '../../apis';

export interface EntriesState{
entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
entries: [],
}


export const EntriesProvider:FC<PropsWithChildren> = ({children}) => {
const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE);

const addNewEntry = async(description: string) => {
// const newEntry:Entry = {
//     _id: uuidv4(),
//     description: description,
//     createdAt: Date.now(),
//     status: 'pending'
// }
const {data} = await entriesApi.post<Entry>('/entries',{description:description}); 
dispatch({type:'[Entry] Add-Entry',payload: data})

}

const updateEntry = async(entry: Entry) => {
    try {
const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`,{description: entry.description,status:entry.status}); 

        dispatch({type:'[Entry] Entry-Updated',payload: data});
    } catch (error) {
        console.log({error});
    }
}

const refreshEntries = async() => {
const {data} = await entriesApi.get<Entry[]>('/entries')
dispatch({type: '[Entry] Refresh-Data',payload:data});
}


useEffect(() => {
refreshEntries()
},[])


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



