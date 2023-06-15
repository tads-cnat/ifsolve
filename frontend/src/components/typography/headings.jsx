import PropTypes from 'prop-types';

export function H5({ children }, props) {
    return (
        <h1 className="text-dark-100 font-medium" {...props}>
            {children}
        </h1>
    );
}

H5.propTypes = {
    children: PropTypes.node.isRequired,
};

export function H4({ children }) {
    return <h1 className="text-lg text-dark-100 font-semibold">{children}</h1>;
}

H4.propTypes = {
    children: PropTypes.node.isRequired,
};

export function H3({ children }) {
    return <h1 className="text-xl text-dark-100 font-semibold">{children}</h1>;
}

H3.propTypes = {
    children: PropTypes.node.isRequired,
};

export function H2({ children, className }) {
    return <h2 className={`text-2xl text-dark-100 font-bold ${className}`}>{children}</h2>;
}

H2.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
};

export function H1({ children }) {
    return <h1 className="text text-4xl text-dark-100 font-bold">{children}</h1>;
}

H1.propTypes = {
    children: PropTypes.node.isRequired,
};
