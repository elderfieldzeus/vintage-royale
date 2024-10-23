export interface CartedItem {
    product_id: number;
    quantity: number;
}

export type OrderStatus = 'SUCCESS' | 'PENDING' | 'FAILED';

export interface OrderDisplay {
    id: number;
    customer_name: string;
    created_at: Date;
    status: OrderStatus;
};