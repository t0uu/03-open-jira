import { useState, ChangeEvent, useContext } from 'react';
import {Button,Box,TextField} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';
export const NewEntry = () => {

   const {addNewEntry} = useContext(EntriesContext)
   const {openEntry,isAddingEntry,closeEntry} = useContext(UIContext)
    // const [isAdding, setisAdding] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const [touched, setTouched] = useState(false);

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

    };

    const onSave = () => {
        if(inputValue.length === 0) return;
        addNewEntry(inputValue)
        isAddingEntry
        setTouched(false);
        setInputValue('');
    }

  return (
    <Box sx={{
        marginBottom:2,
        paddingX: 1,

    }}>
   {isAddingEntry ? (
        <>
         <TextField
    fullWidth
    sx={{marginTop: 2, marginBottom: 1}}
    placeholder='Nueva entrada'
    autoFocus
    multiline
    label='Nueva Entrada'
    helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
    error={inputValue.length <= 0 && touched}
    value={inputValue}
    onChange={onTextFieldChanges}
    onBlur={() => setTouched(true)}
    />
    <Box display='flex' justifyContent={'space-between'}>

    <Button
    variant='text'
    onClick={closeEntry}
    >
Cancelar
    </Button>   
    <Button
    variant='outlined'
    color='secondary'
    endIcon={<SaveOutlinedIcon/>}
    onClick={onSave}
    >
Guardar
    </Button>
        </Box>
        </>
   )
        : (
  <Button
  startIcon={<AddOutlinedIcon/>}
  fullWidth
  variant='outlined'
onClick={openEntry}
  >
Agregar Tarea
    </Button>
        
        )
    
        }
   
      
    </Box>
  )
}
