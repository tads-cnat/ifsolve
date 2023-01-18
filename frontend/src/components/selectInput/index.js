export default function SelectInput(props) {
    return (
        <select
            name={props.name}
            className="w-full rounded-lg px-4 py-2 border border-dark-10 focus:outline-5 focus:outline-primary-100 text-sm font-medium text-dark-60"
            onChange={props.onChange}>
            {props.data !== undefined ?
                props.data.map((item, i) =>
                    <option key={i} value={item.value}>{item.title}</option>
                )
                : null}
        </select>
    )
}