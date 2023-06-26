import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>   
          <CssBaseline />       
          <Routes>
            <Route element={<LoginPage />} path='/' />
            <Route element={<HomePage />} exact path='/home' />
            <Route element={<ProfilePage />} exact path='/profile/:userId' />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
