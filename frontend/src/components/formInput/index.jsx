import { PropTypes } from "prop-types";

export default function FormInput({
    type,
    name,
    onChange,
    onBlur,
    value,
    placeholder,
    className,
}) {
    return (
        <input
            type={type}
            name={name}
            className={`w-full px-4 py-2 border border-dark-20 rounded-lg hover:bg-dark-5 focus:outline focus:outline-4 focus:outline-primary-20 focus:bg-primary-5 transition-all duration-200 ${className}`}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
        />
    );
}

FormInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};
FormInput.defaultProps = {
    placeholder: "",
    className: "",
};
