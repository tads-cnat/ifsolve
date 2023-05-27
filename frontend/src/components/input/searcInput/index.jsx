import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';

export default function SearchInput({ get, set, placeholder }) {
    return (
        <div className="flex items-center relative">
            <FiSearch className="absolute left-3 text-dark-80" />
            <input
                type="text"
                value={get}
                onChange={(e) => set(e.target.value)}
                className="w-full bg-dark-10 pl-10 pr-4 py-2 rounded-lg focus:outline-primary-100"
                placeholder={placeholder}
            />
        </div>
    );
}
SearchInput.propTypes = {
    get: PropTypes.string.isRequired,
    set: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};
SearchInput.defaultProps = {
    placeholder: '',
};
