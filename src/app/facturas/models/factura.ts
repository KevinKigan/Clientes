import {ItemFactura} from './item-factura';
import {Cliente} from '../../components/pages/clientes/cliente';

export class Factura {
  id: number;
  description: string;
  observation: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  total: number;
  createAt: string;

  calculateTotal():number{
    this.total = 0;
    this.items.forEach((item:ItemFactura)=>{
      this.total += item.calculateTotal();
    });
    return this.total;
  }
}
