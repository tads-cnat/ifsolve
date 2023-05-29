import PropTypes from 'prop-types';
import { FiPlusSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function SidebarMobile({ children }) {
    return (
        <div className="flex md:hidden bg-white absolute bottom-0 left-0 w-full px-8 py-4 justify-between gap-2 drop-shadow-sm">
            <Link
                to="/"
                className="flex flex-row items-center gap-4 absolute top-0 right-0 -translate-y-20 mr-12 px-8 py-4 rounded-lg text-lg text-dark-100 bg-primary-60 hover:bg-primary-80 active:bg-primary-100 focus:bg-primary-100"
            >
                <FiPlusSquare />
                Elaborar
            </Link>
            {children}
        </div>
    );
}

SidebarMobile.propTypes = {
    children: PropTypes.node.isRequired,
};
