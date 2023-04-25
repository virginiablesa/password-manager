import React, { Suspense, useReducer } from "react";

import Step1 from "../../views/ProductInformation";
import Step2 from "../../views/Form";
import Step3 from "../../views/Feedback";
import StateContext from "../../contexts/StateContext";
import DispatchContext from "../../contexts/DispatchContext";
import Stepper from "../Stepper/Stepper";
import Loader from "../Loader/Loader";
import styles from "./WrapperApp.module.scss";
import i18next from "i18next";
import wrapperAppReducer from "../../contexts/wrapperAppReducer";

/**
 * Wrapper component for the application
 * @returns {JSX.Element} JSX Element representing the WrapperApp component
 */
function WrapperApp() {
  /**
   * Initial state for the reducer
   * @type {Object}
   * @property {Boolean} isSuccessProcess - Flag indicating whether the process was successful or not
   * @property {Boolean} isLoading - Flag indicating whether the app is currently loading
   */
  const initialState = {
    isSuccessProcess: false,
    isLoading: false
  };

  /**
   * Reducer to manage the state of the WrapperApp component
   * @type {Function}
   */
  const [state, dispatch] = useReducer(wrapperAppReducer, initialState);

  return (
    <Suspense fallback="loading">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <div className={styles.wrapperApp}>
            {state.isLoading && <Loader />}
            <Stepper
              list={[
                {
                  step: 1,
                  title: i18next.t("stepList.step1"),
                  component: Step1
                },
                {
                  step: 2,
                  title: i18next.t("stepList.step2"),
                  component: Step2
                },
                {
                  step: 3,
                  title: "",
                  component: Step3
                }
              ]}
            />
          </div>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </Suspense>
  );
}

export default WrapperApp;
