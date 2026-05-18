import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__slider">
        <span className="toggle-switch__text toggle-switch__text_type_f">
          F
        </span>
        <span className="toggle-switch__text toggle-switch__text_type_c">
          C
        </span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
