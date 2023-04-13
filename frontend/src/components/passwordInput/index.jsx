import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PassowordInput(props) {
    const [getShow, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                name={props.name}
                className={`w-full rounded-lg px-4 py-2 border border-dark-10 hover:border-dark-20 hover:bg-dark-5 focus:outline-5 focus:outline-primary-100 focus:bg-primary-5 pr-32${  props.className}`}
                type={getShow ? "text" : "password"}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
            />
            {props.value.trim().length > 0 ?
                <i className="absolute bottom-2/4 translate-y-2/4 right-0 mr-4 text-sm px-2 py-1 hover:bg-dark-5 rounded-lg cursor-pointer" onClick={e => setShow(!getShow)}>
                    {getShow ? <FiEyeOff /> : <FiEye />}
                </i>
                :
                null}
        </div>
    )
}