import react from "react"
import styles from "./Info.module.css"
import Button from 'react-bootstrap/Button';
import {AiFillLinkedin} from "react-icons/ai"
import {AiFillMail} from "react-icons/ai"
export const Info=()=>{
    return <div className={styles.container}>
        <div className={styles.text}>
        <p>Esta aplicación es una red social desarrollada por Damián Duran, la misma permite la creacion de usuarios,
            edicion de usuarios a travéz de su perfil, permite a los usuarios realizar publicaciones, editarlas y eliminarlas.<br></br>
            Los usuarios de la aplicación pueden seguirse entre si mismos asi como reaccionar a las publicaciones de sus amigos.<br></br>
            El sistema permite poder adjuntar una foto de perfil donde la misma se guardará en el S3 de AWS.<br></br>
            El backend se encuentra desarrollado en Node y se utilizó Firebase como base de datos, el sistema de autorizacion es manualizado.<br></br>
            Actualmente en desarrollo: (7 de febrero del 2023), se espera poder añadir un sistema de chat entre otras mejoras para este mes.
            <br></br><br></br>
        Puedes ponerte en contacto a travéz de mi  <Button variant="primary" type="submit" href="https://www.linkedin.com/in/dami%C3%A1n-duran-5a17b0231/"><AiFillLinkedin/>Linkedin</Button>
        <br></br>O puedes escribirme a mi correo a: damian.luis.porta@gmail.com</p>
        </div>
    
    </div>
}