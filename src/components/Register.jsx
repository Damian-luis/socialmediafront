import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    country: "",
    liveCountry: "",
    birthday: "",
    ocupation: "",
    mail: "",
    password: ""
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const nameHandler = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const lastnameHandler = (e) => {
    setUser({ ...user, lastname: e.target.value });
  };
  const countryHandler = (e) => {
    setUser({ ...user, country: e.target.value });
  };
  const liveCountryHandler = (e) => {
    setUser({ ...user, liveCountry: e.target.value });
  };
  const birthdayHandler = (e) => {
    setUser({ ...user, birthday: e.target.value });
  };
  const ocupationHandler = (e) => {
    setUser({ ...user, ocupation: e.target.value });
  };
  const mailHandler = (e) => {
    setUser({ ...user, mail: e.target.value });
  };
  const passwordHandler = (e) => {
    setUser({ ...user, password: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!user.name || !user.lastname || !user.country || !user.liveCountry || !user.birthday || !user.ocupation || !user.mail || !user.password) {
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${process.env.REACT_APP_URL_BACKEND}/users/addUser`, user).then(e => {
        setShowAlert(true);
        setError(e.data.message);
        console.log(e.data.message);
        setUser({
          name: "",
          lastname: "",
          country: "",
          liveCountry: "",
          birthday: "",
          ocupation: "",
          mail: "",
          password: ""
        });

        navigate("/");
      }).catch(e => {
        setError(e.response.data.message);
      });
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className={styles.container}>
      <Backdrop open={loading} className={styles.backdrop}>
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      </Backdrop>

      <div className={styles.content}>
        <div className={styles.contentLeft}><h1>Conecta</h1></div>
        <div className={styles.contentRight}><h1>Comparte</h1></div>
        <div className={styles.contentLeft}><h1>Interactua</h1></div>
        <div className={styles.contentCenter}>Abre un mundo de posibilidades con un solo click</div>
      </div>

      <div className={styles.formContainer}>
        <div>
          <h2>Bienvenido!</h2>
          <h4>Crea una cuenta para empezar a disfrutar de nosotros</h4>
        </div>
        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.formInside}>
            <div>
              <input type="text" placeholder="Ingresar nombre" onChange={nameHandler} />
              <input type="text" placeholder="Ingresar apellido" onChange={lastnameHandler} />
            </div>
            <div>
              <input type="text" placeholder="Pais donde naciste" onChange={countryHandler} />
              <input type="text" placeholder="Pais donde vives actualmente" onChange={liveCountryHandler} />
            </div>
            <div>
              <label>Fecha de nacimiento</label>
              <input type="date" onChange={birthdayHandler} />
              <input type="text" placeholder="Ocupacion" onChange={ocupationHandler} />
            </div>
            <div>
              <input type="email" placeholder="Ingresar correo" onChange={mailHandler} />
              <input type="text" placeholder="Ingresar contraseña" onChange={passwordHandler} />
            </div>
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity="error">
                Por favor, completa todos los campos.
              </Alert>
            </Snackbar>
            {error && (
              <div className={styles.error}>
                <p>{error}</p>
              </div>
            )}
            <div className={styles.register}>
              <p>Ya tienes una cuenta? <span onClick={() => { navigate("/") }} style={{ color: "blue" }}>Inicia sesion</span></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
