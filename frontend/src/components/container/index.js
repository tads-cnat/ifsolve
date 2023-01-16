export default function Container(props) {
    return (
        <div className={"w-full px-4 md:px-16 lg:px-32 xl:px-48 2xl:px-64 m-0" + " " + props.className}>
            {props.children}
        </div>
    )
}