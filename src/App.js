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
import { Layout } from './layout/layout.js';
import styles from "./App.module.css";

function App() {
  const isLogged=useSelector(state=>state.user.isLoggedIn)
  return (
    <div className="App">
     
      <Provider store={store}>
        {isLogged? 
        <>
        <Sidebar/>
        <div className={styles.main}>
        <Routes>
        {/*<Route path="/" element={<Login/>} />*/}
        <Route path="/" element={<Layout/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/visit-profile" element={<VisitProfile/>}/>
        {isLogged===true?
          <Route path='/home' element={<Home/>}/>
        :null}
        <Route path={"*"} element={ <Login/> }/>
        </Routes>
        </div>
        </>
        :
        <div>
        <Routes>
        <Route path="/" element={<Login/>} />
        </Routes>
        </div>
        }
        
        </Provider>
        
    </div>
  );
}

export default App;
