import { Field } from "formik"
export default function FormControl(props) {
    return (
        <div className="mb-3">
            <Field
                type={props.type ? props.type : "text"}
                name={props.name}
                className={"w-full rounded-lg px-4 py-2 border border-dark-10 focus:outline-5 focus:outline-primary-100 " + props.className}
                placeholder={props.placeholder}
            />
        </div>
    )
}