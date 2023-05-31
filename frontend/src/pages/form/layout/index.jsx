/* eslint-disable react/forbid-prop-types */

import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import * as Yup from 'yup';

export default function FormLayout() {
    const [values, setValues] = useState(1);
    const [currentStep, setCurrentStep] = useState(1);

    function renderForm() {
        switch (currentStep) {
            case 1:
                return <StepOne values={values} onNext={() => setCurrentStep(currentStep + 1)} />;
            case 2:
                return 2;
            case 3:
                return 3;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col px-4 md:px-16 lg:px-48 xl:px-64 py-8 gap-2 w-full h-screen bg-dark-5">
            <h3 className="text-xl text-dark-100 font-medium">Elaborar {renderForm()}</h3>
            <button type="button" onClick={(e) => setCurrentStep(currentStep - 1)}>
                Prev
            </button>
            <button type="button" onClick={(e) => setCurrentStep(currentStep + 1)}>
                Next
            </button>
        </div>
    );
}

function StepOne({ values, onNext }) {
    return <div className="">awdawd</div>;
}
StepOne.propTypes = {
    values: PropTypes.any.isRequired,
};
