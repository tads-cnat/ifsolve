export default function FormLabel(props) {
    return (
        <label className={`text-sm font-medium text-dark-100 ${  props.className}`} htmlFor={props.label}>{props.label}</label>
    )
}