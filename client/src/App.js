import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {themeSettings} from './theme';
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>   
          <CssBaseline />       
          <Routes>
            <Route element={<LoginPage />} path='/' />
            <Route element={ isAuth ? <HomePage /> : <Navigate to="/" />} exact path='/home' />
            <Route element={ isAuth ? <ProfilePage /> : <Navigate to="/" />} exact path='/profile/:userId' />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
