export default function PrimaryButton(props) {
    return (
        <button type={props.type} className={`bg-primary-100 flex px-5 py-3 items-center gap-2 rounded-lg items-center justify-center text-md font-medium text-dark-100 ${  props.className}`}>{props.children}</button>
    )
}