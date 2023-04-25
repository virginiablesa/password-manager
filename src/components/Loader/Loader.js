import styles from "./Loader.module.scss";

/**
 * A loader component.
 *
 * @component
 */
function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span className={styles.loader__text}>Loading</span>
      </div>
    </div>
  );
}

export default Loader;
