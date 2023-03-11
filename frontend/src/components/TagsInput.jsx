import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineClose} from "react-icons/ai";

const TagsInput = ({name,value,onChange}) => {
    const [tag,setTag] = useState("")
    const [tags,setTags] = useState([])

    const input = useRef()
    const tagsInput = useRef()
    const handleOnChange = ({target}) => {
        const {value} = target;
        if(value !== ",") setTag(value);
        onChange(tags);
    }
    const handleKeyDown = ({key}) => {
        if(key === "," || key === "Enter"){
            if(!tag) return;

            if(tags.includes(tag)) return setTag("")

            setTags([...tags,tag]);
            setTag("");
        }
        if(key === 'Backspace' && tag && tags.length){
            const newTags = tags.filter((_,index) => index === tags.length - 1)
            setTags([...newTags])
        }
    }
    const removeTag = tagToRemove => {
        const newTags = tags.filter((tag) => tag !== tagToRemove)
        setTags([...newTags])
    }

    const handleFocus = () => {
        tagsInput.current.classList.remove(
            "dark:border-dark-subtle",
            "border-light-subtle"
        )
        tagsInput.current.classList.add(
            "dark:border-white",
            "border-primary"
        )
    }
    const handleBlur = () => {
        tagsInput.current.classList.add(
            "dark:border-dark-subtle",
            "border-light-subtle"
        )
        tagsInput.current.classList.remove(
            "dark:border-white",
            "border-primary"
        )
    }
    useEffect(()=>{
        if(value.length) setTags(value)
    },[value])

    useEffect(()=>{
        input.current.scrollIntoView(false)
    },[tag])
    return (
        <div>
            <div
                ref={tagsInput}
                onKeyDown={handleKeyDown} className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center space-x-2 overflow-x-auto custom-scroll-bar transition">
                {tags.map(t => <Tag onClick={()=>removeTag(t)} key={t}>{t}</Tag>)}
                <input
                    ref={input}
                    placeholder="Tag one, Tag two"
                    type="text"
                    className="h-full w-full bg-transparent outline-none dark:text-white flex-grow"
                    value={tag}
                    onChange={handleOnChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};

const Tag = ({children,onClick}) => {
    return (
        <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm px-1 whitespace-normal">
                    {children}
                    <button onClick={onClick}>
                        <AiOutlineClose size={12}/>
                    </button>
        </span>
    )
}

export default TagsInput;