import ModalWithForm from "./ModalWithForm/ModalWithForm";
import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(false);

  const { values, handleChange, setValues, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    onUpdateUser(values, resetForm)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText={loading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Full name"
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="https://..."
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
