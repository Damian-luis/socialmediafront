import Spinner from 'react-bootstrap/Spinner';
import styles from "./Spinner.module.css";
function SpinnerComponent() {
  return (
    <div className={styles.container}>
    <Spinner animation="border" role="status" className={styles.logo}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}

export default SpinnerComponent;