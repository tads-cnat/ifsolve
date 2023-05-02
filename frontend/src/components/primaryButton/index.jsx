import PropTypes from "prop-types";

export default function PrimaryButton({ type, className, children }) {
    return (
        // eslint-disable-next-line react/button-has-type
        <button type={type} className={`bg-primary-100 flex px-5 py-3 items-center gap-2 rounded-lg items-center justify-center text-md font-mediums text-dark-100 ${className}`}>{children}</button>
    )
}

PrimaryButton.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
