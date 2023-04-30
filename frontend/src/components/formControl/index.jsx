import PropTypes from 'prop-types';
import { Field } from "formik";

export default function FormControl({ type, name, placeholder, className }) {
    return (
        <div className="mb-3">
            <Field
                type={type || "text"}
                name={name}
                className={`w-full rounded-lg px-4 py-2 border border-dark-10 hover:border-dark-20 hover:bg-dark-5 focus:outline-5 focus:outline-primary-100 focus:bg-primary-5 ${className}`}
                placeholder={placeholder}
            />
        </div>
    );
}
FormControl.propTypes = {
    type: PropTypes.oneOf(['text', 'password']),
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string,
};

FormControl.defaultProps = {
    type: 'text',
    className: '',
};