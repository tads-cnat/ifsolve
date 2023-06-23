import { forwardRef } from 'react';

const InputText = forwardRef((props, ref) => {
    const { label } = props;
    return (
        <div className="">
            <label htmlFor="login" className="block mb-2 text-sm font-medium text-dark-90">
                {label}
            </label>
            <input
                type="text"
                className="p-2 w-full bg-white border border-dark-20 text-dark-100 text-sm rounded-lg focus:outline focus:outline-2 focus:outline-primary-100 shadow-sm"
                {...props}
                ref={ref}
            />
        </div>
    );
});
export default InputText;
