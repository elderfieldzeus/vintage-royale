import { ProductDisplay, ProductSpecifics, ProductUpload } from "../utilities/DTO/Product";
import supabase from "./supabase";
import { Category } from "../utilities/DTO/Category";
import { getAllImages, getMainImage } from "./image";


export async function getProductPage(callable: (data: ProductDisplay[]) => void, page: number, limit: number): Promise<void> {
    const productQuery = supabase
                    .from("product")
                    .select('*')
                    .range(page * limit, (page * limit) + limit - 1)
                    .returns<ProductDisplay[]>();

    const { data, error } = await productQuery;

    if(data !== null) {
        for(const d of data) {
            if(d.id !== undefined) {
                const path = await getMainImage(d.id);
                d.image_path = path;
            }
        }
    }
    
    if(error) {
        console.error(error);
    }
    
    callable(data ? data : []);
}

export async function postProduct(product: ProductUpload): Promise<number> {
    const { data, error } = await supabase 
                    .from("product")
                    .insert([product])
                    .select("id")
                    .returns<{id: number}[]>();
    
    if(error) {
        console.error(error);
    }

    const id = (error && !data) ? -1 : data[0].id;
    return id;
}

export async function getProductDetails(product_id: number, callable: (retProduct: ProductSpecifics) => void): Promise<void> {
    const { data, error } = await supabase
                        .from("product")
                        .select("*")
                        .eq("id", product_id)
                        .returns<ProductSpecifics[]>();

    if(error || data === null) {
        console.log(error);
        return;
    }

    const images: string[] = await getAllImages(product_id);
    const category_name: string = await getCategoryById(data[0].category_id);

    const product: ProductSpecifics = data[0];

    product.image_paths = images;
    product.category_name = category_name;

    callable(product);
}

export async function getCategoryById(category_id: number): Promise<string> {
    const { data, error } = await supabase    
                        .from("product_category")
                        .select("category_name")
                        .eq("id", category_id)
                        .returns<{category_name: string}[]>();
    
    if(error || data === null) {
        console.log(error);
        return "";
    }

    return data[0].category_name;
}

export async function postCategory(category_name: string): Promise<number> {
    const { data, error } = await supabase
                        .from("product_category")
                        .insert([{
                            category_name
                        }])
                        .select("id")
                        .returns<{id: number}[]>();

    if(error) {
        console.error(error);
    }

    const id = (error && !data) ? -1 : data[0].id;
    return id;
}

export async function getCategories(callable: (categories: Category[]) => void): Promise<void> {
    const { data, error } = await supabase
                        .from("product_category")
                        .select("*")
                        .returns<Category[]>();

    if(error) {
        console.error(error);
    }

    callable(data ? data : []);
}

export async function getProductCount(callable: (max : number) => void): Promise<void> {
    const { count, error } = await supabase 
                        .from("product")
                        .select("*", { count: "exact" });
    
    if(error) {
        console.error(error);
    }

    callable(count ? count : 0);
}