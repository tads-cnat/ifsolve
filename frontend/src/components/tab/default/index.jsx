import PropTypes from 'prop-types';

export default function TabDefault({ children }) {
    return (
        <ul className="flex flex-row bg-dark-5 rounded-lg divide-x divide-gray-dark-10">
            {children}
        </ul>
    );
}

TabDefault.propTypes = {
    children: PropTypes.node.isRequired,
};
