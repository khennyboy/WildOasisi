import {useEffect, useRef} from 'react'

function useOutSideClick(handler) {
    // the true parameter here means it should use capturing which means to handle
    // the outer event listener first
    const formRef = useRef()
    useEffect(()=>{
    function handleClick(e){
        if(formRef.current && !formRef.current.contains(e.target)){
        handler()
        }
    }
    document.addEventListener("click", handleClick)

    return ()=> document.removeEventListener("click", handleClick)
    }, [handler]);
    return formRef;
}

export default useOutSideClick