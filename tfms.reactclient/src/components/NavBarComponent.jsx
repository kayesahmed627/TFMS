import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  List,
  
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  styled,
  Collapse,
  ListSubheader,
  
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import MopedIcon from "@mui/icons-material/Moped";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import CommuteIcon from '@mui/icons-material/Commute';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

function NavBarComponent() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollpased] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    console.log(newOpen);
    setOpen(newOpen);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    background: "#3F51B5",
    color: "#000",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));
  
  const handleClick = () => {
    setCollpased(!collapsed);
  };

  return (
    <>
      <Box sx={{ p: 0, m: 0 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 1, p: 0, mt: 0, mb: 0 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TFMS RectJS Client
            </Typography>
            <Button href="/" color="inherit">
              Home
            </Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box role="presentation" sx={{ width: 256 }}>
          {
            <DrawerHeader color="primary">
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "white" }}
              >
                TFMS Menu
              </Typography>
            </DrawerHeader>
          }
          <Divider />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="Visitors & Tickets"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton component='a' href="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton href="/Visitors">
              <ListItemIcon>
                <WcIcon />
              </ListItemIcon>
              <ListItemText primary="Visitor" />
            </ListItemButton>

            <ListItemButton href="/Bookings">
              <ListItemIcon>
                <BookOnlineIcon />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItemButton>

            {/* <ListItemButton >
              <ListItemIcon>
                <CommuteIcon />
              </ListItemIcon>
              <ListItemText primary="Parking" />
            </ListItemButton> */}

            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
              <CommuteIcon />
              </ListItemIcon>
              <ListItemText primary="Parking" />
              {collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={collapsed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} href="/exhibitor-parking">
                  <ListItemIcon>
                    <MopedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Exhibitor Parking" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} href="/visitor-parking">
                  <ListItemIcon>
                    <MopedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Visitor Parking" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default NavBarComponent;
