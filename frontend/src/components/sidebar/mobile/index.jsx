import PropTypes from 'prop-types';
import { FiPlusSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function SidebarMobile({ children }) {
    return (
        <div className="flex md:hidden bg-white w-full px-8 py-4 justify-between gap-2 drop-shadow-sm fixed bottom-0 left-0">
            <Link
                to="/elaborar"
                className="flex flex-row items-center gap-4 absolute top-0 right-0 -translate-y-20 mr-8 px-8 py-4 rounded-lg text-lg font-medium text-dark-100 bg-primary-60 hover:bg-primary-80 active:bg-primary-100 focus:bg-primary-100"
            >
                <FiPlusSquare />
                Criar
            </Link>
            {children}
        </div>
    );
}

SidebarMobile.propTypes = {
    children: PropTypes.node.isRequired,
};
