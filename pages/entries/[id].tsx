import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Layout } from "../../components/layouts";
import { capitalize,Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntryStatus, Entry } from '../../interfaces/entry';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';


const validStatus: EntryStatus[] = ['pending','in-progress','finished']

interface Props {
    entry: Entry
}


const EntryPage:FC<Props> = ({entry}) => {

const {updateEntry} = useContext(EntriesContext)
const [inputValue, setInputValue] = useState(entry.description);
const [status, setStatus] = useState(entry.status);
const [touched, setTouched] = useState(false);
const isNotValid = useMemo(() => inputValue.length <= 0 && touched,[inputValue,touched]);

const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

};

const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setStatus(event.target.value as EntryStatus);
}

const onSave = () => {
    if(inputValue.trim().length === 0) return;

    const isupdateEntry:Entry = {
        ...entry,
        status,
        description: inputValue
    }
 
    updateEntry(isupdateEntry,true);
}

 
 return (
<Layout title={inputValue.substring(0,20) + '...'}>
        <Grid
        container
        justifyContent='center'
        sx={{marginTop:2}}
        >
        <Grid item xs={12} sm={8} md={6}>
            <Card>
                <CardHeader
                title={`Entrada:`}
                subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                />
            <CardContent>
                <TextField
                sx={{marginTop:2,marginBottom:1}}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label='Nueva entrada'
                value={inputValue}
                onChange={onInputValueChange}
                helperText={ isNotValid && 'Ingrese un valor'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
                />
           <FormControl>
            <FormLabel>
                Estado:
            </FormLabel>
            <RadioGroup
            row
            value={status}
            onChange={onStatusChanged}
            >
                {
                    validStatus.map(option => (
                        <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio/>}
                        label={capitalize(option)}
                        />
                    ))
                }
            </RadioGroup>
           </FormControl>
            </CardContent>
            <CardActions>
                <Button
                startIcon={<SaveOutlinedIcon/>}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}

                >
                    Save
                </Button>
            </CardActions>

            </Card>
        </Grid>


        <IconButton sx={{
            position:'fixed',
            bottom:30,
            right:30,
            backgroundColor:'error.dark'
        }}>
            <DeleteOutlineOutlinedIcon/>
        </IconButton>
        </Grid>
    </Layout>
    )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {id} = params as {id: string};
    const entry = await dbEntries.getEntryById(id);
    if(!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }



    return {
        props: {
            entry: entry
        }
    }
}


export default EntryPage;