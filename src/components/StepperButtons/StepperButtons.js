import { useTranslation } from "react-i18next";
import styles from "./StepperButtons.module.scss";
import { FiChevronRight } from "react-icons/fi";
import PropTypes from "prop-types";

/**
 * A component that renders the buttons for the stepper.
 * @module StepperButtons
 * @param {Object} props - The component props.
 * @param {Function} props.handleCancel - The function to handle the cancel button click event.
 * @param {Function} props.handleNext - The function to handle the next button click event.
 * @param {boolean} props.isNextButtonEnabled - A boolean that indicates whether the next button is enabled or not.
 * @param {boolean} props.leftButtonHidden - A boolean that indicates whether the left button is hidden or not.
 * @param {boolean} props.areCustomButtons - A boolean that indicates whether custom buttons should be used instead of the default ones.
 * @param {Object} props.customStyles - An object containing custom styles to be applied to the buttons wrapper.
 * @param {Node} props.children - The child elements to be rendered inside the buttons wrapper.
 * @return {JSX.Element} - The rendered component.
 */
function StepperButtons(props) {
  const { t } = useTranslation();
  return (
    <div className={`${styles.buttonsWrapper} ${props.leftButtonHidden ? styles.rightAligned : ""}`} style={props.customStyles}>
      {!props.areCustomButtons && (
        <>
          {!props.leftButtonHidden && (
            <button onClick={props.handleCancel} className="btn btn-secondary" data-testid="cancel">
              {t("buttons.cancel")}
            </button>
          )}
          <button onClick={props.handleNext} className="btn btn-primary" disabled={!props.isNextButtonEnabled} data-testid="next">
            {t("buttons.next")}
            <FiChevronRight className="btn__arrow" />
          </button>
        </>
      )}
      {props.children}
    </div>
  );
}

StepperButtons.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  isNextButtonEnabled: PropTypes.bool.isRequired,
  leftButtonHidden: PropTypes.bool.isRequired,
  areCustomButtons: PropTypes.bool.isRequired,
  customStyles: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default StepperButtons;
