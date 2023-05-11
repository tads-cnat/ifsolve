import { PropTypes } from "prop-types";

export default function InputGroup({ label, children }) {
    return (
        <div className="grid grid-cols-1 mb-5">
            <h2 className="text-xl font-medium text-dark-100 mb-4">{label}</h2>
            <div className="">
                {children}
            </div>
        </div>
    )
}

InputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
