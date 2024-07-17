import Supabase from "./Supabase";

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

