import {useEffect, useRef} from 'react'

function useOutSideClick(handler, listenCapturing = true) {
    const formRef = useRef()
    useEffect(()=>{
    function handleClick(e){
        if(formRef.current && !formRef.current.contains(e.target)){
        handler()
        }
    }
    document.addEventListener("click", handleClick, listenCapturing)
    // this means js should use capturing and capturing means that the 
    // the parent click is handled first

    return ()=> document.removeEventListener("click", handleClick, listenCapturing)
    }, [handler, listenCapturing]);
    return formRef;
}

export default useOutSideClick