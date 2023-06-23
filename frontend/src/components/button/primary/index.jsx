import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonPrimary({ children, link, onClick, className, disabled }) {
    return (
        <Link
            to={link}
            onClick={onClick}
            className={`bg-primary-80 font-medium hover:bg-primary-100 rounded-lg px-4 py-2 ${className} ${
                disabled
                    ? 'cursor-not-allowed bg-primary-40 text-dark-60 hover:bg-primary-40'
                    : null
            }`}
            disabled={!!disabled}
        >
            {children}
        </Link>
    );
}

ButtonPrimary.propTypes = {
    children: PropTypes.node.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};

ButtonPrimary.defaultProps = {
    link: '',
    onClick: null,
    className: '',
    disabled: false,
};
