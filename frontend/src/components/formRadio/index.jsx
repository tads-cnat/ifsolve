import { PropTypes } from "prop-types";

export default function FormRadio({
    name,
    value,
    onChange,
    onBlur,
    label,
    descripton,
}) {
    return (
        <label
            htmlFor={name}
            className="flex border border-dark-10 px-4 py-2 gap-4 rounded-lg"
        >
            <input
                name={name}
                type="radio"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            <div className="flex flex-col justify-center">
                <p className="text-lg font-medium">{label}</p>
                <p>{descripton}</p>
            </div>
        </label>
    );
}

FormRadio.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    descripton: PropTypes.string,
};
FormRadio.defaultProps = {
    descripton: "",
};
