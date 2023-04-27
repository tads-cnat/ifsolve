import { PropTypes } from "prop-types";

export default function FormLabel({ className, label }) {
    return (
        <label
            className={`text-sm font-medium text-dark-100 ${className}`}
            htmlFor={label}
        >
            {label}
        </label>
    );
}
FormLabel.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
};
FormLabel.defaultProps = {
    className: "",
};
