import { useEffect, useMemo, useCallback } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const defaultValues = useMemo(
    () => ({
      name: "",
      imageUrl: "",
      weather: "",
    }),
    [],
  );

  const errorData = useMemo(
    () => ({
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
    }),
    [],
  );

  const { values, handleChange, setValues, errors, setErrors, resetForm } =
    useForm(defaultValues, errorData);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm?.() || handleReset();
    }
  }, [isOpen, resetForm]);

  const handleReset = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
  }, [setValues, defaultValues, setErrors]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

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
      <fieldset className="form__fieldset form__fieldset-info">
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
            <span className="form__error-msg form__error-msg_visible">
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
            <span className="form__error-msg form__error-msg_visible">
              {errors.imageUrl}
            </span>
          )}
        </label>
      </fieldset>

      <fieldset className="form__fieldset form__fieldset-radio">
        <legend className="form__radio-legend">Select the weather type:</legend>
        <label htmlFor="radio__hot" className="form__label-radio">
          <input
            id="radio__hot"
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <span className="radio__text">Hot</span>
        </label>

        <label htmlFor="radio__warm" className="form__label-radio">
          <input
            id="radio__warm"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
            required
          />
          <span className="radio__text">Warm</span>
        </label>

        <label htmlFor="radio__cold" className="form__label-radio">
          <input
            id="radio__cold"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            required
          />
          <span className="radio__text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
