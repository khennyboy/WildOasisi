import { useState, useEffect } from "react";
import { NAME_OF_SESSIONSTORAGE } from "../utils/Constant";

export function useLocalStorageState() {
  const [value, setValue] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches)

  useEffect(()=>{
    const storage = JSON.parse(localStorage.getItem(NAME_OF_SESSIONSTORAGE)) 
    if(storage !== null) setValue(storage)
  }, [])

  return [value, setValue];
}
