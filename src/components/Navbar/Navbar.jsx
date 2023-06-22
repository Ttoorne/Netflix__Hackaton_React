import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContextProvider';
import { ADMIN } from '../../helpers/consts';

const pages = [
  { name: 'Главная', link: '/', id: 1 },
  { name: 'Все', link: '/products', id: 2 },
  { name: 'Сериалы', link: '/series', id: 4 },
  { name: 'Фильмы', link: '/films', id: 8 },
  { name: 'Мультфильмы', link: '/cartoons', id: 9 },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {
    handleLogout,
    user: { email },
  } = useAuth();

  const settings = ['Профиль', 'Избранное', 'Корзина'];

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: 'black', height: '100px' }}>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: 'black',
          height: '105px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid rgba(35,35,35,1)',
        }}>
        <Toolbar disableGutters sx={{ width: '100%' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily:
                'Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <img
              src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
              width={'180px'}
              height={'100px'}
              alt=""
              href="/"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <Link key={page.id} to={page.link}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      fontFamily={
                        'Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif'
                      }>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              {email === ADMIN ? (
                <Link to="/admin">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Добавить</Typography>
                  </MenuItem>
                </Link>
              ) : null}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily:
                'Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <img
              src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
              width={'170px'}
              height={'100px'}
              alt=""
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.link}
                style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#cbcbcb',
                    '&:hover': {
                      color: '#fdfdfd',
                      textDecoration: 'none',
                      transition: '0.5s',
                    },
                    fontFamily:
                      'Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif',
                  }}>
                  {page.name}
                </Button>
              </Link>
            ))}
            {email === ADMIN ? (
              <Link to="/admin">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontSize: '18px',
                    color: '#cbcbcb',
                    '&:hover': {
                      color: '#fdfdfd',
                      textDecoration: 'none',
                      transition: '0.5s',
                    },
                  }}>
                  Добавить
                </Button>
              </Link>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              {email ? (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}>
                  <Typography textAlign="center">Выйти</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                  }}>
                  <Link to="/auth">
                    <Typography textAlign="center">
                      Войти или зарегестрироваться
                    </Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
