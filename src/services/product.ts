import { PostgrestError } from "@supabase/supabase-js";
import { Product } from "../utilities/DTO/Product";
import supabase from "./supabase";

const PRODUCT_OFFSET = 10;

export async function getProductPage(callable: (data: Product[], error: PostgrestError | null) => void, page: number): Promise<void> {
    const productQuery = supabase
        .from("product")
        .select('*')
        .range(page * PRODUCT_OFFSET, (page * PRODUCT_OFFSET) + PRODUCT_OFFSET - 1)
        .returns<Product[]>();

    const { data, error } = await productQuery;
    
    if(error) {
        console.error(error);
    }
    
    callable(data ? data : [], error);
}