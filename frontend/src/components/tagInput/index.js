import { useState } from "react"
import { FiX } from "react-icons/fi";

export default function TagInput({ get, set }) {
    const [getInput, setInput] = useState("");

    function handleChange(e) {
        setInput(e.replace(',', ''));
    }
    function handleKeyDown(e) {
        const trimInput = getInput.trim();
        if ((e.key === "," || e.key === "Enter") && trimInput.length > 0 && !get.includes(trimInput)) {
            e.preventDefault();
            set(get => [...get, { 'nome': trimInput }]);
            setInput("");
        }
    }
    function removeTag(e, tag) {
        e.preventDefault();
        set(get.filter((item) => item.nome !== tag));
    }

    return (
        <div className="tag-input mb-3">
            <div className="flex gap-2 w-100 flex-wrap">
                {get.map((tag, i) =>
                    <div key={i} className="flex gap-2 bg-dark-5 px-2 py-1 rounded-md"><small className="text-xs font-medium text-dark-100">{tag.nome}</small> <i onClick={(e) => removeTag(e, tag.nome)}><FiX></FiX></i></div>
                )}
            </div>
            <input type="text" value={getInput} placeholder="Enter a tag" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => handleChange(e.target.value)} className="w-full px-4 py-2 mt-2 rounded-md border-2 border-dark-10 text-primary-50 focus:border-primary-100 focus:outline-primary-100 active:border-primary-100 mb-3" />
        </div>
    )
}