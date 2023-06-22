import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

export default function InputTag({ get, set }) {
    const [getInput, setInput] = useState('');

    function handleChange(e) {
        setInput(e);
    }
    function handleKeyDown(e) {
        const trimInput = getInput.trim();
        if (e.key === 'Enter' && trimInput.length > 0 && !get.includes(trimInput)) {
            e.preventDefault();
            set(() => [...get, { nome: trimInput }]);
            setInput('');
        }
    }
    function removeTag(e, tag) {
        e.preventDefault();
        set(get.filter((item) => item.nome !== tag));
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 w-100 flex-wrap">
                {get.map((tag) => (
                    <div key={tag.id} className="flex gap-2 bg-dark-5 px-2 py-1 rounded-md">
                        <small className="text-xs font-medium text-dark-100">{tag.nome}</small>
                        <button
                            type="button"
                            onClick={(e) => removeTag(e, tag.nome)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    removeTag(e, tag.nome);
                                }
                            }}
                            tabIndex={0}
                        >
                            <FiX />
                        </button>
                    </div>
                ))}
            </div>
            <div className="relative">
                {!getInput && (
                    <span className="pointer-events-none flex absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                        <span>Pressione</span>
                        <AiOutlineEnter className="bg-slate-300 ml-2 mr-2 mt-1 text-black" />
                        <span>para inserir uma tag</span>
                    </span>
                )}
                <input
                    type="text"
                    className="w-full px-4 py-4 bg-dark-5 rounded-lg"
                    value={getInput}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
            </div>
        </div>
    );
}

InputTag.propTypes = {
    get: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            email: PropTypes.string.isRequired,
        })
    ).isRequired,
    set: PropTypes.func.isRequired,
};
