import { useState } from "react"

export default function TagInput() {
    const [getTags, setTags] = useState([])
    const [getInput, setInput] = useState("");

    function handleChange(e) {
        setInput(e.replace(',', ''));
    }
    function handleKeyDown(e) {
        const trimInput = getInput.trim();
        if ((e.key === ",") && trimInput.length > 0 && !getTags.includes(trimInput)) {
            console.log(e.key);
            setTags(getTags => [...getTags, trimInput]);
            setInput("");
        }
    }
    function removeTag(e, tag) {
        e.preventDefault();
        setTags(getTags.filter((item) => item != tag));
    }

    return (
        <div className="tag-input mb-3">
            <input type="text" value={getInput} placeholder="Enter a tag" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => handleChange(e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100 mb-3" />
            <div className="flex gap-2 w-100 flex-wrap">
                {getTags.map((tag, i) =>
                    <div key={i} className="bg-white px-2 py-1 rounded-md"><small>{tag}</small> <i onClick={(e) => removeTag(e, tag)}>x</i></div>
                )}
            </div>
        </div>
    )
}