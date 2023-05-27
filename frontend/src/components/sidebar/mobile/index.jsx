import PropTypes from 'prop-types';

export default function SidebarMobile({ children }) {
    return <div className="bg-white absolute bottom-0 left-0 w-full px-4 py-2 ">{children}</div>;
}

SidebarMobile.propTypes = {
    children: PropTypes.node.isRequired,
};
