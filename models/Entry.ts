import mongoose,{Model,Schema} from 'mongoose';
import { Entry } from '../interfaces';

export enum Status {
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    FINISHED = 'finished'
}


export interface IEntry extends Entry {}

const entrySchema = new Schema({
    description: {type:String, required:true},
    createdAt:{type:Number},
    status:{
        type:String,
        enum:Status,
        default: Status.PENDING
    }
});



const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry',entrySchema);


export default EntryModel;