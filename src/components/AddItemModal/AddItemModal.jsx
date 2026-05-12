import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";

export default function AddItemModal({
  onCloseClick,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onAddItemModalSubmit === "function") {
      onAddItemModalSubmit(values);
    }

    resetForm();
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onCloseClick}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
          required
        />
      </label>

      <fieldset className="modal__radio">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__label modal__label_type_radio">
          <input
            name="weather"
            value="hot"
            type="radio"
            onChange={handleChange}
            checked={values.weather === "hot"}
            required
          />
          <span>Hot</span>
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            name="weather"
            value="warm"
            type="radio"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          <span>Warm</span>
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            name="weather"
            value="cold"
            type="radio"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
