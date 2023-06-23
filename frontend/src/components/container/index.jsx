import PropTypes from 'prop-types';

export default function Container({ children, className }) {
    return (
        <div className={`w-full px-4 md:px-16 lg:px-32 xl:px-64 2xl:px-72 m-0 ${className}`}>
            {children}
        </div>
    );
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

Container.defaultProps = {
    className: '',
};
