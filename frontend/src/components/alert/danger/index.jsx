import PropTypes from 'prop-types';

export default function AlertDanger({ icon, children }) {
    return (
        <div
            className="flex items-center gap-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
        >
            {icon}
            <span>{children}</span>
        </div>
    );
}

AlertDanger.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.element,
};

AlertDanger.defaultProps = {
    icon: null,
};
