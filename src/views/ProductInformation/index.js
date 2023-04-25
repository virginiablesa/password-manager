import React, { useState } from "react";
import StepperButtons from "../../components/StepperButtons/StepperButtons";
import Step from "../../components/Step/Step";
import intro1 from "../../assets/img/group.svg";
import intro2 from "../../assets/img/group-3.svg";
import styles from "./ProductInformation.module.scss";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

/**
 * A component that displays product information in a step of a stepper.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the step.
 * @param {function} props.handleNext - The function to handle clicking the "Next" button.
 * @param {function} props.handleCancel - The function to handle clicking the "Cancel" button.
 * @returns {JSX.Element}
 */
function ProductInformation(props) {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Step title={props.title}>
      <div className={styles.info}>
        <div className={styles.introduction}>
          <div className={styles.introduction__container}>
            <img src={intro1} alt={t("productInformation.intro1.alt")} />
            <p>{t("productInformation.intro1.description")}</p>
          </div>
          <div className={styles.introduction__container}>
            <img src={intro2} alt={t("productInformation.intro2.alt")} />
            <p>{t("productInformation.intro2.description")}</p>
          </div>
        </div>

        <h4>{t("productInformation.explanation1.title")}</h4>
        <ul>
          <li>{t("productInformation.explanation1.listItem1")}</li>
          <li>{t("productInformation.explanation1.listItem2")}</li>
        </ul>

        <h4>{t("productInformation.explanation2.title")}</h4>
        <p>{t("productInformation.explanation2.paragraph")}</p>
        <div className={styles.info__checkboxContainer}>
          <input type="checkbox" id="termsAndConditions" name="acceptTermsAndConditions" onChange={handleCheckBox} checked={isChecked} className={styles.info__checkboxContainer__checkbox} /> <label htmlFor="termsAndConditions">{t("productInformation.checkboxText")}</label>
        </div>
      </div>
      <StepperButtons handleCancel={props.handleCancel} handleNext={props.handleNext} isNextButtonEnabled={isChecked} leftButtonHidden={true} />
    </Step>
  );
}

ProductInformation.propTypes = {
  title: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default ProductInformation;
