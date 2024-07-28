import {useEffect, useRef} from 'react'

function useOutSideClick(handler) {
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