import React, { useContext, useMemo } from "react";
import StateContext from "../../contexts/StateContext";
import Step from "../../components/Step/Step";
import styles from "./Feedback.module.scss";
import { FiAlertTriangle, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import StepperButtons from "../../components/StepperButtons/StepperButtons";
import PropTypes from "prop-types";

/**
 * A React component that displays feedback based on the success or error status of a process
 * @param {object} props - The component props
 * @param {string} props.title - The title of the step in the stepper component
 * @param {function} props.handleCancel - The function to handle the cancellation of the process
 * @returns {JSX.Element} - The JSX element representing the Feedback component
 */
function Feedback(props) {
  const { t } = useTranslation();
  const appState = useContext(StateContext);
  const content = useMemo(() => {
    return appState.isSuccessProcess
      ? {
          title: i18next.t("feedback.success.title"),
          description: i18next.t("feedback.success.description"),
          img: FiCheckCircle
        }
      : {
          title: i18next.t("feedback.error.title"),
          description: i18next.t("feedback.error.description"),
          img: FiAlertTriangle
        };
  }, [appState.isSuccessProcess]);

  const IconComponent = content.img;

  const customStyles = {
    justifyContent: "flex-end"
  };

  return (
    <Step title={props.title}>
      <div className={styles.feedback}>
        <div className={styles.feedback__content}>
          <IconComponent size={35} data-testid={appState.isSuccessProcess ? "success-icon" : "error-icon"} />
          <div className={styles.feedback__content__textContent}>
            <div className={styles.feedback__content__header}>{content.title}</div>
            <p className={styles.feedback__content__description}>{content.description}</p>
          </div>
        </div>
      </div>
      <StepperButtons areCustomButtons={true} customStyles={customStyles}>
        {appState.isSuccessProcess ? (
          <a href="https://www.openbank.es/" className={styles.link}>
            {t("feedback.btn1")}
            <FiChevronRight className={styles.arrow} />
          </a>
        ) : (
          <button onClick={props.handleCancel} className={styles.cancelButton}>
            {t("feedback.btn2")}
            <FiChevronRight className={styles.arrow} />
          </button>
        )}
      </StepperButtons>
    </Step>
  );
}

Feedback.propTypes = {
  title: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default Feedback;
