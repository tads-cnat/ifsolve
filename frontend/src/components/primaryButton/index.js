export default function PrimaryButton(props) {
    return (
        <button type={props.type} className="bg-primary-100 flex px-4 py-2 items-center gap-2 rounded-lg">{props.children}</button>
    )
}