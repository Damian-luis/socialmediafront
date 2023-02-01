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
function App() {
  const isLogged=useSelector(state=>state.user.isLoggedIn)
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
        <Route path="/" element={<Login/>} />
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
        </Provider>
    </div>
  );
}

export default App;
