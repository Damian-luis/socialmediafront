import react from 'react';
import { Sidebar } from '../components/Sidebar';
import { useState } from 'react';
import { Login } from '../components/Login';
import { Home } from '../components/Home';
import styles from "./layout.module.css"
export const Layout=({children})=>{

    //const isLogged=localStorage.getItem('logged')
    
    return <>
     
        <div className={styles.main}>
    <Sidebar/>
           
        <main>
           {children}
           
           </main>
        </div>
        
    
    </>
}

