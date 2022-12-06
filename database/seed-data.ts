import { Status } from '../models/Entry';

interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry{
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries:[
        {
            description: 'Pendiente: lorem',
            status: Status.PENDING,
            createdAt: Date.now(),
        },
        {
            description: 'In-progress: lorem alsdlzxopcjmaiojwepdw',
            status: Status.IN_PROGRESS,
            createdAt: Date.now() - 100000,
        },
        {
            description: 'Finished: lorem alsdlzxclasdpwep',
            status: Status.FINISHED,
            createdAt: Date.now() - 10000,
        }
    ]
}