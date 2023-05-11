import { PropTypes } from "prop-types";

export default function FormArea({ children }) {
    return <div className="mb-5">{children}</div>;
}

FormArea.propTypes = {
    children: PropTypes.node.isRequired,
};
