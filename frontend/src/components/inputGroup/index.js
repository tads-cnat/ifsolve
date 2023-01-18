export default function InputGroup(props) {
    return (
        <div className="grid grid-cols-1 mb-5">
            <h2 className="text-xl font-medium text-dark-100 mb-4">{props.label}</h2>
            <div className="">
                {props.children}
            </div>
        </div>
    )
} 