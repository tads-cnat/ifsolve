import PropTypes from 'prop-types';

export default function SidebarMobile({ children }) {
    return (
        <div className="flex md:hidden bg-white absolute bottom-0 left-0 w-full px-8 py-4 justify-between gap-2 drop-shadow-sm">
            {children}
        </div>
    );
}

SidebarMobile.propTypes = {
    children: PropTypes.node.isRequired,
};
