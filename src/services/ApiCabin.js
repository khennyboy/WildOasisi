import Supabase, { supabaseUrl } from "./Supabase";
export async function getCabins(){ 
    const { data, error } = await Supabase
    .from('cabins')
    .select('*');
    if(error){
        throw new Error('Cabins could not be loaded')
    }
    return data
}

export async function deleteCabin(id) {
    const { data, error } = await Supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }
    return data
}

export async function createEditCabin(newCabin, id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    let imageName;
    if(!hasImagePath){
        imageName = `${Math.random()}-${newCabin.image.name}`.
        replaceAll('/','');
    }

    const imagePath = hasImagePath ? 
        newCabin.image : 
        `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query =  Supabase.from('cabins')

    if(!id)
       query =  query
        .insert([{...newCabin, image: imagePath}])
    if(id)
       query =  query.update({...newCabin, image: imagePath}).
        eq("id", id)

    const { data, error } = await query.select()
    if (error) {
        throw new Error(error.message);
    }
    if(hasImagePath) return data
    //2. Upload cabin
    const {error: strorageError} = await Supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image)

    //3. Delete the Cabin if there was an error uploading image
    if(strorageError){
        await Supabase
        .from('cabins')
        .delete()
        .eq('id', data.id);
    }
    return data
}
 
