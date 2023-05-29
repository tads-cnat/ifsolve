import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../providers/context';

export default function SidebarItemDefault({ link, itemKey, icon, label, className }) {
    const { getCurrentPage } = useContext(GlobalContext);

    return (
        <Link
            to={link}
            className={`group flex flex-row items-center gap-3 px-5 py-2 rounded-md hover:bg-dark-5 transition duration-200 ${className} ${
                getCurrentPage === itemKey ? 'bg-dark-10' : ''
            }`}
        >
            <div className="text-dark-100">{icon}</div>
            <span className="font-medium text-dark-100">{label}</span>
        </Link>
    );
}

SidebarItemDefault.propTypes = {
    link: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

SidebarItemDefault.defaultProps = {
    className: '',
};
