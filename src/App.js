import { BrowserRouter , Routes , Route } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserDetails from './pages/UserDetails';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import Todo from './pages/Todo';

function App() {
  return (
     <div>
        <BrowserRouter>
        <Routes>
          <Route path='/'  element={<UserLogin />} />   
          <Route path='/user' element = {<UserDetails />} />
          <Route path='/home'  element={<HomePage />}/>
          <Route path='/about'  element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/to'  element={<Todo />} />
        </Routes>  
        </BrowserRouter>
     </div>
  );
}

export default App;
