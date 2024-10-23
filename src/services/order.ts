import { CartedItem, OrderDisplay } from "../utilities/DTO/Order";
import supabase from "./supabase";

export async function getOrderPage (callable: (orders: OrderDisplay[]) => void, page: number, limit: number): Promise<void> {
    try {
        const { data, error } = await supabase
                            .from("order")
                            .select("*")
                            .order("status", { ascending: true })
                            .range(page * limit, (page * limit) + limit - 1)
                            .returns<OrderDisplay[]>();
                            

        if(error || !data) {
            return console.error(error);
        }

        callable(data);
    }
    catch(error) {
        console.error(error);
    }
}

export async function getOrderCount(callable: (max: number) => void): Promise<void> {
    try {
        const { count, error } = await supabase 
                            .from("order")
                            .select("*", { count: "exact" });

        if(error || !count) {
            return console.error(error);
        }

        callable(count);
    }
    catch(error) {
        console.error(error);
    }
}

export async function postOrder (customer_name: string, customer_number: string, customer_email: string, jsonOrders: string) {
    try {
        const { data, error } = await supabase
                            .from("order")
                            .insert([{
                                customer_name,
                                customer_number,
                                customer_email,
                                status: 'PENDING'
                            }])
                            .select("id")
                            .returns<{id: number}[]>();

        if(error || !data) {
            console.error(error);
            return;
        }

        const cartedItems: CartedItem[] = jsonOrders ? JSON.parse(jsonOrders) : [];
        const order_id = data[0].id;

        for(const cartedItem of cartedItems) {
            await postOrderProduct(cartedItem, order_id);
        }
    }
    catch(error) {
        console.error(error);
    }
}

export async function postOrderProduct(cartedItem: CartedItem, order_id: number) {
    try {
        const { error } = await supabase
                            .from("ordered_product")
                            .insert([{
                                ...cartedItem,
                                order_id
                            }]);

        if(error) {
            console.error(error);
        }
    }
    catch(error) {
        console.error(error);
    }
}