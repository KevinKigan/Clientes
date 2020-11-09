import {Product} from './product';

export class ItemFactura {
  product: Product;
  quantity: number = 1;
  price: number;

  calculateTotal():number{
    return this.quantity * this.product.price;
  }
}
