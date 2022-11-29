import { Card,CardActionArea,CardActions,Typography,CardContent } from '@mui/material';
import { Entry } from '../../interfaces';
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    entry: Entry;
}


export const EntryCard:FC<Props> = ({entry}) => {

    const {startDragging,endDragging} = useContext(UIContext)
    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text',entry._id);
        // todo: modificar el estado, para verificar que estoy haciendo drag;
        startDragging()
    }

    const onDragEnd = () => {
        // todo: cancelar on drag
        endDragging()
    }
  return (
    <Card
    sx={{marginBottom: 1}}
    // Eventos de drag
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',justifyContent:'end', paddingRight: 2}}>
                <Typography variant="body2">Hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
