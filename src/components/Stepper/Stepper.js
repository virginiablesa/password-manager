import React, { useState } from "react";
import StepperProgressBar from "../StepperProgressBar/StepperProgressBar";
import styles from "./Stepper.module.scss";
import PropTypes from "prop-types";

/**
* Stepper Component
* @module Stepper
* @param {Object} props - Component props
* @param {Array} props.list - Array of steps to render
* @returns {JSX.Element} - Rendered component
* @example
  import Stepper from './Stepper';
  const steps = [
    {
      step: 1,
      title: 'Step 1',
      component: StepOne
    },
    {
      step: 2,
      title: 'Step 2',
      component: StepTwo
    },
    {
      step: 3,
      title: 'Step 3',
      component: StepThree
    }
  ];
  function App() {
  return <Stepper list={steps} />;
  }
*/

function Stepper(props) {
  const [activeStep, setActiveStep] = useState(1);

  /**
   * Handle next button click
   * @function
   * @name handleNext
   */
  const handleNext = () => {
    if (activeStep < props.list.length) {
      setActiveStep(activeStep + 1);
    }
  };

  /**
   * Handle cancel button click
   * @function
   * @name handleCancel
   */
  const handleCancel = () => {
    setActiveStep(1);
  };
  return (
    <div className={styles.stepper}>
      <StepperProgressBar list={props.list} activeStep={activeStep} />

      {props.list.map((item, index) => {
        if (activeStep === item.step) {
          const StepComponent = item.component;
          return (
            <div key={index}>
              <StepComponent title={item.title} handleCancel={handleCancel} handleNext={handleNext} />
            </div>
          );
        } else {
          return null; // avoiding lint error
        }
      })}
    </div>
  );
}

Stepper.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired
    })
  ).isRequired
};

export default Stepper;
