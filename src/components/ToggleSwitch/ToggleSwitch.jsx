import { useContext } from "react";
import "../ToggleSwitch/ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function ToggleSwitch() {
  const { handleToggleSwitch, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="switch__label" htmlFor="switch">
      <input
        name="switch"
        type="checkbox"
        id="switch"
        className="switch__input"
        onChange={handleToggleSwitch}
      />
      <span className="switch__circle"></span>
      <span
        className={`switch__letter switch__letter_F ${
          currentTemperatureUnit === "F" ? "switch__letter_color" : ""
        }`}
      >
        F
      </span>
      <span
        className={`switch__letter switch__letter_C ${
          currentTemperatureUnit === "C" ? "switch__letter_color" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
