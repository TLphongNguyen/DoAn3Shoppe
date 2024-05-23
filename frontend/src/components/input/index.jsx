import React from 'react';
import { useController } from 'react-hook-form';
const InputField = ({ name, control, label, placeholder, type = "text", ...props }) => {
    const {
        field,
        fieldState: { error }
    } = useController({
        name,
        control,
        defaultValue: ""
    });
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...field}
                {...props}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
};

export default InputField;