import {Route,Routes } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Profile } from './components/Profile.jsx';
import { Home } from './components/Home.jsx';
import {Friends} from './components/Friends.jsx';
import {VisitProfile} from './components/VisitProfile.jsx';
import { Register } from './components/Register.jsx';
import { Search } from './components/Search.jsx';
import { store } from './app/store'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux';
import { Sidebar } from './components/Sidebar.jsx';
import { Layout } from './layout/layout.jsx';
import styles from "./App.module.css";
import { useEffect,useState } from 'react';

function App() {
  /*const isLoggeda=useSelector(state=>state.user.isLoggedIn)
  const isLogged=localStorage.getItem('logged')
  console.log(isLogged)*/
  
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
     
      <Provider store={store}>
        
       
        
        
        <Routes>
        {/*<Route path="/" element={<Login/>} />*/}
        <Route path="/" element={loggedIn?<Layout><Home/></Layout>:<Login onLogin={()=>setLoggedIn(true)}/>} />
        <Route path="/profile" element={<Layout><Profile/></Layout>}/>
        <Route path="/friends" element={<Layout><Friends/></Layout>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/search" element={<Layout><Search/></Layout>}/>
        <Route path="/visit-profile" element={<Layout><VisitProfile/></Layout>}/>
        {/*loggedIn===true?
          <Route path='/home' element={<Layout><Home/></Layout>}/>
  :null*/}
        <Route path="/home" element={<Layout><Home/></Layout>}/>
        <Route path={"*"} element={ <Login/> }/>
        </Routes>
        
        
        
        
        </Provider>
        
    </div>
  );
}

export default App;
