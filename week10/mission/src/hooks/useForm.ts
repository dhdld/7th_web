import { useState, useEffect } from "react";

interface UseFormProps<T> {
    initialValue: T;
    validate: (values: T) => Partial<T>;
}

function useForm<T extends Record<string, any>>({ initialValue, validate }: UseFormProps<T>) {
    const [values, setValues] = useState<T>(initialValue);
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [errors, setErrors] = useState<Partial<T>>({});

    const handleChangeInput = (name: keyof T, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleBlurInput = (name: keyof T) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    const getTextInputProps = (name: keyof T) => ({
        value: values[name] ?? "",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(name, e.target.value),
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
