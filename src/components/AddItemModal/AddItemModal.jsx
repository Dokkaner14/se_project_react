import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function AddItemModal({ onCloseModal, isOpen, onAddItem }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Pass resetForm to App so it can call it only after a successful API response
  function handleSubmit(e) {
    e.preventDefault();
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            value="hot"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />{" "}
          <span className="modal__radio-text">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            value="warm"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          <span className="modal__radio-text">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            value="cold"
            type="radio"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
