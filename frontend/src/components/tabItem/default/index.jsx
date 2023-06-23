import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function TabItemDefault({ icon, label, active, to, onClick }) {
    return (
        <Link to={to} className="flex justify-center items-center w-full px-4 py-2">
            {icon} {label}
        </Link>
    );
}

TabItemDefault.propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
};

TabItemDefault.defaultProps = {
    icon: null,
    to: '',
    onClick: null,
};
