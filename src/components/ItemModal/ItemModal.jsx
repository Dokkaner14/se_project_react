import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";
import "./ItemModal.css";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  // custom validation
  const errorData = {
    name: {
      required: true,
      minLength: 2,
      message: "Please enter 2 characters or more...",
    },
    imageUrl: {
      required: true,
      pattern: /^https?:\/\/.+/,
      message: "Enter a valid URL...",
    },
  };

  const { values, handleChange, setValues, errors, setErrors } = useForm(
    defaultValues,
    errorData,
  );

  function handleReset() {
    setValues(defaultValues);
    setErrors({});
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    onAddItem(values);
  }
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New garment"
      name="new-card"
      buttonText="add-garment"
      onSubmit={handleAddSubmit}
      handleChange={handleChange}
    >
      <fieldset className=" form__fieldset form__fieldset-info">
        <label htmlFor="name" className="form__label form__label-name">
          Name
          <br />
          <input
            id="name"
            type="text"
            name="name"
            className="form__input form__input-name"
            placeholder="Name"
            onChange={handleChange}
            value={values.name}
            required
          />
          {errors.name && (
            <span
              className={`form__error-msg ${errors.name ? "form__error-msg_visible" : "form__error-msg_hidden"}`}
            >
              {errors.name}
            </span>
          )}
        </label>
        <label htmlFor="url" className="form__label form__label-image">
          Image
          <br />
          <input
            id="url"
            type="url"
            name="imageUrl"
            className="form__input form__input-name"
            placeholder="Image URL"
            onChange={handleChange}
            value={values.imageUrl}
            required
          />
          {errors.imageUrl && (
            <span
              className={`form__error-msg ${errors.imageUrl ? "form__error-msg_visible" : "form__error-msg_hidden"} `}
            >
              {errors.imageUrl}
            </span>
          )}
        </label>
      </fieldset>
      <fieldset className=" form__fieldset form__fieldset-radio">
        <legend className="form__radio-legend">Select the weather type:</legend>
        <label htmlFor="radio__hot" className=" form__label-radio">
          <input
            id="radio__hot"
            type="radio"
            name="weather"
            className="form__input form__input-radio"
            onChange={handleChange}
            value="hot"
            checked={values.weather === "hot"}
            required
          />
          <span className="radio__text">Hot</span>
        </label>
        <label htmlFor="radio__warm" className=" form__label-radio">
          <input
            id="radio__warm"
            type="radio"
            name="weather"
            className="form__input form__input-radio"
            onChange={handleChange}
            value="warm"
            checked={values.weather === "warm"}
            required
          />
          <span className="radio__text">Warm</span>
        </label>
        <label htmlFor="radio__cold" className=" form__label-radio">
          <input
            id="radio__cold"
            type="radio"
            name="weather"
            className="form__input form__input-radio"
            onChange={handleChange}
            value="cold"
            checked={values.weather === "cold"}
            required
          />
          <span className="radio__text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
