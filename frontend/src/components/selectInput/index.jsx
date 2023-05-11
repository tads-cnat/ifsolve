import PropTypes from "prop-types";

export default function SelectInput({ name, onChange, data }) {
    return (
        <select
            name={name}
            className="w-full rounded-lg px-4 py-2 border border-dark-10 focus:outline-5 focus:outline-primary-100 text-sm font-medium text-dark-60"
            onChange={onChange}
        >
            {data !== undefined ? (
                data.map((item) => (
                    <option key={item.id} value={item.value}>
                        {item.title}
                    </option>
                ))
            ) : null}
        </select>
    );
}

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};
