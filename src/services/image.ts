import supabase from "./supabase";

export async function uploadFile(fileBody: File): Promise<string> {
    const filePath =  Math.random() + '-' + fileBody.name;
    const { error } = await supabase
                            .storage
                            .from('products')
                            .upload(filePath, fileBody, {
                                cacheControl: '3600',
                                upsert: false
                            });

    if(error) {
        console.error(error);
        return "";
    }

    return filePath;
}

export async function postImage(image_path: string, product_id: number): Promise<void> {
    const { error } = await supabase
                    .from("image")
                    .insert([{
                        image_path,
                        product_id
                    }]);

    if(error) {
        console.error(error);
    }
}

export async function getMainImage(product_id: number): Promise<string> {
    const { data, error } = await supabase
                        .from("image")
                        .select("image_path")
                        .eq("product_id", product_id)
                        .returns<{image_path: string}[]>();
    
    if(error) {
        console.error(error);
        return "";
    }

    if(data.length === 0) return "";

    const url = supabase 
            .storage
            .from("products")
            .getPublicUrl(data[0].image_path);
    

    return url.data.publicUrl;
}