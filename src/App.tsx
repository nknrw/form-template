import React, { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

// Интерфейс для описания структуры данных формы
interface FormData {
  username: string;
  password: string;
  "empty-input": string;
  dropdownOption?: string;
  rememberMe?: boolean;
  radioSelection?: string;
}

function App() {
  // Состояния компонента
  const [option, setOption] = useState(""); // Состояние выбранной опции для выпадающего списка
  const [showOptionsMenu, setShowOptionsMenu] = useState(false); // Состояние для отображения/скрытия списка опций выпадающего списка
  const [formData, setFormData] = useState<FormData>({
    // Состояние данных формы
    username: "",
    password: "",
    "empty-input": "",
  });
  const [rememberMe, setRememberMe] = useState(false); // Состояние флага "Запомнить меня"
  const [radioSelection, setRadioSelection] = useState(""); // Состояние выбранной опции радио-кнопок
  const [switchState, setSwitchState] = useState(false); // Состояние переключателя
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({}); // Состояние ошибок формы

  // Обработчики событий

  // Обработчик клика по кнопке "Options"
  const handleOptionsClick = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  // Обработчик клика по опции выпадающего списка
  const handleOptionClick = (option: string) => {
    setOption(option);
    setFormData({ ...formData, dropdownOption: option });
    setShowOptionsMenu(false);
  };

  // Обработчик изменения значения полей ввода
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
    setFormErrors({
      ...formErrors,
      [name]: value ? "" : "Field is required",
    });
  };

  // Обработчик изменения флага "Запомнить меня"
  const handleRememberMeChange = (e: FormEvent<HTMLInputElement>) => {
    setRememberMe(e.currentTarget.checked);
  };

  // Обработчик изменения состояния переключателя
  const handleSwitchChange = () => {
    setSwitchState(!switchState);
  };

  // Обработчик изменения выбранной опции радио-кнопок
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioSelection(e.currentTarget.value);
  };

  // Обработчик клика по кнопке "Next"
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      setFormErrors({
        ...formErrors,
        username: formData.username ? "" : "Field is required",
        password: formData.password ? "" : "Field is required",
      });
    } else {
      const updatedFormData: FormData = {
        ...formData,
        rememberMe: rememberMe,
        radioSelection: radioSelection,
      };
      alert(JSON.stringify(updatedFormData));
    }
  };

  // Вспомогательные функции

  // Проверка валидности формы
  const isFormValid = () => {
    const errors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.username) {
      errors.username = "Field is required";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Field is required";
      isValid = false;
    }

    return isValid;
  };

  // Возвращаемый JSX
  return (
    <div className="app">
      <form className="form">
        {/* Поля ввода */}

        <div className="text-field">
          <label className="input-label" htmlFor="username">
            Username
          </label>
          <input
            className={`text-input ${formErrors.username ? "invalid" : ""}`}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            onChange={handleInputChange}
          />
          {formErrors.username && (
            <span className="validation-error">{formErrors.username}</span>
          )}
        </div>

        <div className="text-field">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            className={`text-input ${formErrors.password ? "invalid" : ""}`}
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
          {formErrors.password && (
            <span className="validation-error">{formErrors.password}</span>
          )}
        </div>

        <div className="text-field">
          <label className="input-label" htmlFor="empty-input">
            Input Text Label
          </label>
          <input
            className="text-input"
            type="text"
            name="empty-input"
            id="empty-input"
            onChange={handleInputChange}
            placeholder="Enter text (optional)"
          />
          {formErrors["empty-input"] && (
            <span className="validation-error">
              {formErrors["empty-input"]}
            </span>
          )}
        </div>

        <label className="checkbox-label" htmlFor="checkbox">
          <input
            className="checkbox-input"
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <div className={`checkbox-custom ${rememberMe ? "checked" : ""}`} />
          Remember me
        </label>

        <label className="checkbox-label" htmlFor="switch">
          <input
            className="checkbox-input"
            type="checkbox"
            name="switch"
            id="switch"
            checked={switchState}
            onChange={handleSwitchChange}
          />
          <div className={`switch-custom ${switchState ? "on" : ""}`} />
          {switchState ? "On" : "Off"}
        </label>

        <div className="radio-container">
          <label
            className={`radio-label ${
              radioSelection === "Radio selection 1" ? "selected" : ""
            }`}
            htmlFor="radio1"
          >
            <input
              className="radio-input"
              type="radio"
              name="radio"
              id="radio1"
              value="Radio selection 1"
              checked={radioSelection === "Radio selection 1"}
              onChange={handleRadioChange}
            />
            <div className="radio-custom" />
            Radio selection 1
          </label>

          <label
            className={`radio-label ${
              radioSelection === "Radio selection 2" ? "selected" : ""
            }`}
            htmlFor="radio2"
          >
            <input
              className="radio-input"
              type="radio"
              name="radio"
              id="radio2"
              value="Radio selection 2"
              checked={radioSelection === "Radio selection 2"}
              onChange={handleRadioChange}
            />
            <div className="radio-custom" />
            Radio selection 2
          </label>

          <label
            className={`radio-label ${
              radioSelection === "Radio selection 3" ? "selected" : ""
            }`}
            htmlFor="radio3"
          >
            <input
              className="radio-input"
              type="radio"
              name="radio"
              id="radio3"
              value="Radio selection 3"
              checked={radioSelection === "Radio selection 3"}
              onChange={handleRadioChange}
            />
            <div className="radio-custom" />
            Radio selection 3
          </label>
        </div>

        <div className="select-field">
          <input
            className={`select-input ${showOptionsMenu ? "focus" : ""}`}
            onClick={handleOptionsClick}
            value={option}
            placeholder="Dropdown option"
          />
          {showOptionsMenu && (
            <div className="select-container">
              <div
                className="select-option"
                onClick={() => handleOptionClick("Dropdown option 1")}
              >
                Dropdown option 1
              </div>
              <div
                className="select-option"
                onClick={() => handleOptionClick("Dropdown option 2")}
              >
                Dropdown option 2
              </div>
              <div
                className="select-option"
                onClick={() => handleOptionClick("Dropdown option 3")}
              >
                Dropdown option 3
              </div>
            </div>
          )}
        </div>
      </form>

      <div className="buttons-container">
        <button className="cancel">Cancel</button>
        <button
          className={`submit ${!isFormValid() ? "disabled" : ""}`}
          type="submit"
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
