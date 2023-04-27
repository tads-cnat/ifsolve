import { FiAlertCircle } from "react-icons/fi";
import { PropTypes } from "prop-types";

export default function FormAlert({ children }) {
    return (
        <div className="flex text-sm font-medium text-rose-500 items-center gap-2 my-2">
            <FiAlertCircle />
            <span> {children}</span>
        </div>
    );
}

FormAlert.propTypes = {
    children: PropTypes.node.isRequired,
};
