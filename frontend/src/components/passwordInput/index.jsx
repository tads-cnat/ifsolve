import { useState } from "react";
import PropTypes from "prop-types";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({ name, onChange, onBlur, value, className }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                name={name}
                className={`w-full rounded-lg px-4 py-2 border border-dark-10 hover:border-dark-20 hover:bg-dark-5 focus:outline-5 focus:outline-primary-100 focus:bg-primary-5 pr-32 ${className}`}
                type={showPassword ? "text" : "password"}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            {value.trim().length > 0 && (
                <button
                    className="absolute bottom-2/4 translate-y-2/4 right-0 mr-4 text-sm px-2 py-1 hover:bg-dark-5 rounded-lg cursor-pointer"
                    tabIndex="0"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            )}
        </div>
    );
}

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
};

PasswordInput.defaultProps = {
    className: "",
};
