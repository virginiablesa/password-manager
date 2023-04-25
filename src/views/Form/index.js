import React, { useEffect, useReducer, useState, useContext } from "react";
import { FiEye } from "react-icons/fi";
import DispatchContext from "../../contexts/DispatchContext";
import StepperButtons from "../../components/StepperButtons/StepperButtons";
import { submitForm } from "../../services/api";
import Step from "../../components/Step/Step";
import styles from "./Form.module.scss";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import PropTypes from "prop-types";

/**
 * A form component that allows a user to create a new password.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the form.
 * @param {function} props.handleNext - The function to handle the next button click.
 */
function Form(props) {
  const { t } = useTranslation();
  const appDispatch = useContext(DispatchContext);

  /**
   * State variable that determines whether the password input field is visible or hidden for the first password field.
   * @type {boolean}
   */
  const [visible1, setVisible1] = useState(false);

  /**
   * State variable that determines whether the password input field is visible or hidden for the second password field.
   * @type {boolean}
   */
  const [visible2, setVisible2] = useState(false);

  /**
   * State variable that determines whether the next button is enabled or disabled.
   * @type {boolean}
   */

  const [enableNextButton, setEnableNextButton] = useState(false);

  /**
   * The initial state of the form reducer.
   * @type {object}
   * @property {object} password1 - The first password field state.
   * @property {string} password1.value - The value of the first password field.
   * @property {boolean} password1.hasErrors - Whether there are any errors with the first password field.
   * @property {string} password1.errorMessage - The error message for the first password field.
   * @property {object} password2 - The second password field state.
   * @property {string} password2.value - The value of the second password field.
   * @property {boolean} password2.hasErrors - Whether there are any errors with the second password field.
   * @property {string} password2.errorMessage - The error message for the second password field.
   * @property {object} hint - The hint field state.
   * @property {string} hint.value - The value of the hint field.
   * @property {boolean} hint.hasErrors - Whether there are any errors with the hint field.
   * @property {string} hint.errorMessage - The error message for the hint field.
   * @property {number} hint.charCount - The character count of the hint field.
   */
  const initialState = {
    password1: {
      value: "",
      hasErrors: false,
      errorMessage: ""
    },
    password2: {
      value: "",
      hasErrors: false,
      errorMessage: ""
    },
    hint: {
      value: "",
      hasErrors: false,
      errorMessage: "",
      charCount: 0
    }
  };

  /**
   * Object containing error messages.
   * @type {object}
   */
  const errors = {
    passErr1: i18next.t("form.pass.error1"),
    passErr2: i18next.t("form.pass.error2"),
    passErr3: i18next.t("form.pass.error3"),
    passErr4: i18next.t("form.pass.error4")
  };

  const _reducer = (state, action) => {
    const newState = { ...state };
    let id = action.type !== "isHintEntered" ? action.payload.id : "";
    let value = action.type !== "isHintEntered" ? action.payload.value : "";
    switch (action.type) {
      case "isHintEntered":
        newState.hint.value = action.value;
        newState.hint.charCount = action.value.length;
        return newState;
      case "isPasswordEntered":
        newState[id].hasErrors = false;
        newState[id].errorMessage = "";
        newState[id].value = value;
        if (!newState[id].value.trim()) {
          newState[id].hasErrors = true;
          newState[id].errorMessage = errors.passErr1;
        }
        if (newState.password1.value !== "" && newState.password2.value !== "" && newState.password2.value !== newState.password1.value) {
          newState[id].hasErrors = true;
          newState[id].errorMessage = errors.passErr2;
        }
        if (newState.password1.value !== "" && newState.password2.value !== "" && !newState.password1.hasErrors && !newState.password2.hasErrors) {
          setEnableNextButton(true);
        }
        return newState;
      case "isPasswordEnteredAfterDelay":
        if (newState[id].value && !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(newState[id].value)) {
          newState[id].hasErrors = true;
          newState[id].errorMessage = errors.passErr3;
        }
        if (newState[id].value.length < 8) {
          newState[id].hasErrors = true;
          newState[id].errorMessage = errors.passErr3;
        }
        return newState;
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(_reducer, initialState);

  /**
   * useEffect hook that triggers when the value of state.password1 changes.
   * Sets a delay of 800ms before dispatching "isPasswordEnteredAfterDelay" action to update the state.
   *
   * @param {Object} state - The current state object
   */
  useEffect(() => {
    if (state.password1.value) {
      const delay = setTimeout(() => dispatch({ type: "isPasswordEnteredAfterDelay", payload: { value: state.password1.value, id: "password1" } }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.password1.value]);

  /**
   * useEffect hook that triggers when the value of state.password2 changes.
   * Sets a delay of 800ms before dispatching "isPasswordEnteredAfterDelay" action to update the state.
   *
   * @param {Object} state - The current state object
   */
  useEffect(() => {
    if (state.password2.value) {
      const delay = setTimeout(() => dispatch({ type: "isPasswordEnteredAfterDelay", payload: { value: state.password2.value, id: "password2" } }), 800);
      return () => clearTimeout(delay);
    }
  }, [state.password2.value]);

  /**
   * Async function that handles the next button click event.
   * Disables the next button, dispatches "waitingrequest" action and submits the form.
   * Sets the success feedback based on the response and enables the next button.
   */
  const handleNextButton = async () => {
    let createNewPasswordSuccess = false;
    try {
      appDispatch({ type: "waitingrequest" });
      setEnableNextButton(false);
      await submitForm(state.password1.value, state.password2.value, state.hint.value);
      createNewPasswordSuccess = true;
    } catch (err) {
      console.log("se ha producido un error", err);
    } finally {
      setEnableNextButton(true);
    }
    appDispatch({ type: "setSuccessFeedback", value: createNewPasswordSuccess });

    props.handleNext();
  };

  return (
    <Step title={props.title}>
      <div className={styles.form}>
        <p className="pass-form__description">{t("form.description1")}</p>

        <div className={styles.password}>
          {/* Password 1 */}
          <div className={styles.password__wrapper}>
            <label htmlFor="pass1" className={styles.form__label}>
              {t("form.pass1.label")}
            </label>
            <div className={`${styles.form__input} ${styles.password__passContainer} ${state.password1.hasErrors ? styles.error : ""}`}>
              <input id="pass1" type={visible1 ? "text" : "password"} name="password1" placeholder={t("form.pass1.placeholder")} className="pass-form__password__input" maxLength="24" onChange={e => dispatch({ type: "isPasswordEntered", payload: { value: e.target.value, id: "password1" } })} />
              <FiEye className={styles.reveal} onClick={() => setVisible1(!visible1)} />
            </div>
            <div className={styles.error__alert}>{state.password1.errorMessage}</div>
          </div>

          {/* Password 2 */}
          <div className={styles.password__wrapper}>
            <label htmlFor="pass2" className={styles.form__label}>
              {t("form.pass2.label")}
            </label>
            <div className={`${styles.form__input} ${styles.password__passContainer} ${state.password2.hasErrors ? styles.error : ""}`}>
              <input id="pass2" type={visible2 ? "text" : "password"} name="password2" placeholder={t("form.pass2.placeholder")} className="pass-form__password__input" maxLength="24" onChange={e => dispatch({ type: "isPasswordEntered", payload: { value: e.target.value, id: "password2" } })} />
              <FiEye className={styles.reveal} onClick={() => setVisible2(!visible2)} />
            </div>
            <div className={styles.error__alert}>{state.password2.errorMessage}</div>
          </div>
        </div>

        {/* Hint 2 */}
        <p>{t("form.description2")}</p>
        <div className={styles.hint}>
          <label htmlFor="hint" className={styles.form__label}>
            {t("form.hint.label")}
          </label>
          <textarea id="hint" name="hint" rows="1" cols="33" placeholder={t("form.hint.placeholder")} maxLength={60} onChange={e => dispatch({ type: "isHintEntered", value: e.target.value })} className={`${styles.form__input} ${styles.hint__container}`}></textarea>
          <div className={styles.hint__count}>{state.hint.charCount}/60</div>
        </div>

        <StepperButtons handleCancel={props.handleCancel} handleNext={handleNextButton} isNextButtonEnabled={enableNextButton} />
      </div>
    </Step>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default Form;
