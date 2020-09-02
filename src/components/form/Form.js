import React from 'react';
import { Formik } from 'formik';

const Form = (props) => {
    const {errorHandler, onSubmit, FormContent, initialValues} = props;
    console.log(FormContent);
    return (
        <>
        <Formik
        validationOnChange={false}
        validationOnBlur={false}
        initialValues={initialValues}
        validate={values => {
            const errors = errorHandler(values);
            return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            onSubmit(values);   
            setSubmitting(false);  
        }}
    >
        {({
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        }) => (
        <form onSubmit={handleSubmit}>
            <FormContent handleChange={handleChange} errors={errors} values={values} isSubmitting={isSubmitting}/>   
        </form>
        )}
    </Formik>
    </>
    )
}

export default Form;