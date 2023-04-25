import styles from "./Step.module.scss";
import PropTypes from "prop-types";

/**
 * Step component.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title for the step.
 * @param {ReactNode} props.children - The child elements to render.
 * @returns {ReactNode} The rendered component.
 */
function Step(props) {
  return (
    <div className={styles.StepWrapper}>
      {props.title !== "" && <h1 className={styles.StepWrapper__title}>{props.title}</h1>}
      {props.children}
    </div>
  );
}

Step.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Step;
