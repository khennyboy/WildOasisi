import Supabase, { supabaseUrl } from "./Supabase";

export async function signup({fullName, email, password}){
  const {data, error} = await Supabase.auth.signUp({
        email, password, options:{
            data: {
                fullName,
                avatar: ''
            }
        }
    })
    if(error){
        throw new Error(error.message)
    }
    return data
}

export async function login({email, password}){
    let {data, error} = await Supabase.auth.
    signInWithPassword({
        email,
        password
    })
    if(error) throw new Error(error.message);
    return data
}

export async function getCurrentUser(){
    const {data: session} = await Supabase.auth.getSession()
    if(!session.session) return null;
    
    const {data, error} = await Supabase.auth.getUser()
    if(error) throw new Error(error.message);
    return data
}

export async function logout(){
    const {error} = await Supabase.auth.signOut()
    if(error) throw new Error(error.message)
}

export async function updateCurrentUser({password, fullName, avatar}){
    //1.Update password or fullName
    let updateData;
    if(password) updateData = {password}
    if(fullName) updateData = {data: {fullName}}

    const {data, error} = await Supabase.auth.updateUser(updateData)
    if(error) throw new Error(error.message);

    if(!avatar) return data;
    console.log(data)
    //2. Update the avatar image
    const fileName = `avatar-${data.user.id}-${Math.random()}`

    const {error: storageError} = await Supabase.storage
    .from('avatars')
    .upload(fileName, avatar)

    if(storageError) throw new Error(storageError.message);

    //3. Update the avatar in the user
    const {data:updatedUser , error: error2} = await Supabase.auth.updateUser({
        data:{
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })
    if(error2) throw new Error(error2.message);
    return updatedUser
}