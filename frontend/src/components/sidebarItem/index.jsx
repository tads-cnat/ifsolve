import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { GlobalContext } from "../../providers/context";

export default function SidebarItem({ link, itemKey, icon, title }) {
    const { getCurrentPage } = useContext(GlobalContext);

    return (
        <Link
            to={link}
            className={`group flex flex-row items-center gap-3 px-5 py-2 rounded-md hover:bg-primary-100 transition duration-200 ${getCurrentPage === itemKey ? "bg-primary-80" : ""}`}
        >
            <div className="text-dark-100">{icon}</div>
            <span className="font-medium text-dark-100">{title}</span>
        </Link>
    );
}

SidebarItem.propTypes = {
    link: PropTypes.string.isRequired,
    itemKey: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
};
