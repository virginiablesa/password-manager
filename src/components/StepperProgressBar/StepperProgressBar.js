import styles from "./StepperProgressBar.module.scss";
import PropTypes from "prop-types";

/**
 * Displays a progress bar for the stepper component.
 * @function
 * @name StepperProgressBar
 * @param {object} props - The props object.
 * @param {array} props.list - An array of objects that define the steps in the stepper.
 * @param {number} props.activeStep - The current active step of the stepper.
 * @returns {JSX.Element}
 */
function StepperProgressBar(props) {
  return (
    <>
      <div className={styles.stepperWrapper}>
        <ul className={styles.stepperWrapper__list}>
          {props.list.map((item, index) => {
            const isActiveStep = props.activeStep === item.step;
            const isCompleted = props.activeStep >= index + 1;
            return (
              <li key={item.step} className={`${styles.stepperWrapper__list__item} ${isCompleted ? styles.completed : ""} ${styles.stepNumber} ${isActiveStep ? styles.active : ""}`}>
                <div className={styles.stepNumberWrapper}>
                  <div className={styles.stepNumber}>
                    <span>{!isActiveStep && isCompleted ? "L" : item.step}</span>
                  </div>
                  {isActiveStep && <span className={styles.arrow}></span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

StepperProgressBar.propTypes = {
  list: PropTypes.shape({
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired
  }).isRequired,
  activeStep: PropTypes.number
};

export default StepperProgressBar;
