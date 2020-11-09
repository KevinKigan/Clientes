import {Region} from './region';
import {Factura} from '../../../facturas/models/factura';

export class Cliente {
    id: number;
    clientName: string;
    lastName: string;
    createAt: string;
    email: string;
    photo: string;
    region: Region;
    facturas: Array<Factura> = [];
}
