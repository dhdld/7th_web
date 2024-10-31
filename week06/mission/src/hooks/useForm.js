import { useState, useEffect } from "react";

function useForm({ initialValue, validate }) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeInput = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleBlurInput = (name) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    const getTextInputProps = (name) => ({
        value: values[name],
        onChange: (e) => handleChangeInput(name, e.target.value),
        onBlur: () => handleBlurInput(name),
    });

    useEffect(() => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }, [values, validate]);

    return {
        values,
        errors,
        touched,
        getTextInputProps,
    };
}

export default useForm;
