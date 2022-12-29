export default function FormLabel(props) {
    return (
        <label className="text-md font-medium text-dark-80" htmlFor={props.label}>{props.label}</label>
    )
}