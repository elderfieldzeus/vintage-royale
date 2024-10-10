import supabase from "./supabase";

export async function uploadFile(path: string, fileBody: File, callable: () => void) {
    const { data, error } = await supabase
                            .storage
                            .from('avatars')
                            .upload(path, fileBody, {
                                cacheControl: '3600',
                                upsert: false
                            });

    if(error) {
        console.error(error);
    }
    else {
        console.log(data);
    }

    callable();
}