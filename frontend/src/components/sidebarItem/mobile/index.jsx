import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../providers/context';

export default function SidebarItemMobile({ icon, label, itemKey, link, onClick }) {
    const { getCurrentPage } = useContext(GlobalContext);

    return (
        <Link
            to={link}
            onClick={onClick}
            className={`flex w-full flex-col items-center gap-2 ${
                getCurrentPage === itemKey ? 'text-dark-100 stroke-4' : 'text-dark-60 stroke-0'
            }`}
        >
            <span className="text-xl">{icon}</span>
            <span
                className={`text-sm ${
                    getCurrentPage === itemKey ? 'text-dark-80 font-medium' : ''
                }`}
            >
                {label}
            </span>
        </Link>
    );
}

SidebarItemMobile.propTypes = {
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
};

SidebarItemMobile.defaultProps = {
    link: '',
    onClick: null,
};
