import { useState } from "react";

const useForm = (initialValues) => {
  const [Values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    // console.log("name, value, files, type:", name, value, files, type);

    let newValue;
    if (name == "customerImage") {
      newValue = files[0];
    } else {
      newValue = value;
    }

    // type === "file" ? (newValue = files[0]) : (newValue = value);
    // console.log("newValue:", newValue);

    setValues({ ...Values, [name]: newValue });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    Values,
    handleChange,
    resetForm,
    setValues,
  };
};

export default useForm;
