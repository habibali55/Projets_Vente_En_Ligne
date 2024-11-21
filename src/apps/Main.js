import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TbLayoutDashboard, TbTablePlus } from "react-icons/tb";
import { Outlet, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { Menu, MenuItem } from '@mui/material'; // Importer le Menu et MenuItem
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Main() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null); // Etat pour l'ancrage du menu
  const openMenu = Boolean(anchorEl); // Vérifier si le menu est ouvert

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index, link) => {
    setSelectedIndex(index);
    navigate(link);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Ouvrir le menu à l'élément cliqué
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Fermer le menu
  };

  const handleProfileEdit = () => {
    navigate('/Profile');
    handleMenuClose();
  };

  const handleProfileArchive = () => {
    navigate('/Archiver');
    handleMenuClose();
  };

  const handleSignOut = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem('token');
  
    // Rediriger l'utilisateur vers la page de connexion
    navigate('/login');
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#737373' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Conteneur des icônes aligné à droite */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={() => navigate("/PanierEtPaiement")}>
              <FaShoppingCart />
            </IconButton>
            <IconButton color="inherit" onClick={handleProfileClick}>
              <CgProfile />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', color: '#737373' }}>
            ParLunettes
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <FaChevronRight /> : <FaChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{ title: 'Shop', icon: <TbLayoutDashboard />, link: "/" }, { title: 'Gérer les produits', icon: <TbTablePlus />, link: "/Produit" }].map((item, index) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: selectedIndex === index ? '#737373' : 'inherit',
                }}
                onClick={() => handleListItemClick(index, item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: selectedIndex === index ? '#FFFFFF' : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{
                  opacity: open ? 1 : 0,
                  color: selectedIndex === index ? '#FFFFFF' : 'inherit'
                }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>

      {/* Menu déroulant pour l'icône du profil */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleProfileEdit}>Modifier le profil</MenuItem>
        <MenuItem onClick={handleProfileArchive}>Archiver</MenuItem>
        <MenuItem onClick={handleSignOut}>Se déconnecter</MenuItem>
      </Menu>
    </Box>
  );
}
