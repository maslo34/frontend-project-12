import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authUserSlice';

import { Container, Button } from 'react-bootstrap';

import { t } from 'i18next';

const NavBar = () => {
  const authorizationTokenLocalStorage = JSON.parse(
    window.localStorage.getItem('auth')
  );
  const navigate = useNavigate();
  const dispath = useDispatch();
  const logOut = () => {
    window.localStorage.removeItem('auth');
    dispath(logout());
    navigate('login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Link className="navbar-brand" to="/">
          {t('navBar.hexlet')}
        </Link>
        {authorizationTokenLocalStorage && (
          <Button onClick={logOut} variant="primary">
            {t('navBar.exit')}
          </Button>
        )}
      </Container>
    </nav>
  );
};

export default NavBar;
