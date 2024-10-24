import { ProductCart } from "./Product";

export interface CartedItem {
    product_id: number;
    quantity: number;
}

export type OrderStatus = 'SUCCESS' | 'PENDING' | 'FAILED';

export interface OrderDisplay {
    id: number;
    created_at: Date;
    customer_name: string;
    customer_number: string;
    customer_email: string;
    status: OrderStatus;
};

export interface OrderedProduct {
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
}

export interface OrderSelected extends OrderDisplay {
    products: ProductCart[];
    total_price: number;
}