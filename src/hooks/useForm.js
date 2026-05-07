import { useState } from "react";

function useForm(defaultValues, errorData) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });

    const errorMessages = handleValidation(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessages,
    }));
  }

  function handleValidation(name, value) {
    const rules = errorData[name];

    if (!rules) return "";

    if (rules.required && !value.trim()) return "Required";
    if (rules.minLength && value.length < rules.minLength)
      return `${rules.message}`;
    if (rules.pattern && !rules.pattern.test(value)) return `${rules.message}`;
    return "";
  }
  return { values, handleChange, setValues, errors, setErrors };
}

export default useForm;
