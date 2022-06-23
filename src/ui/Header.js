import React, { useEffect, useState } from "react";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import { Tabs, Tab } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import logo from "../assets/logo.svg";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
  },
  logo: {
    height: "5em",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    height: "45px",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    "&:hover": {
      opacity: 1,
    },
    opacity: 0.7,
  },
}));

function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/customsoftware" },
    { name: "Mobile App Development", link: "/mobileapps" },
    { name: "Website Development", link: "/websites" },
  ];

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/estimate" && value !== 5) {
      setValue(5);
    }
  }, [value]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              onClick={() => {
                setValue(0);
              }}
              disableRipple
            >
              <img alt="Company Logo" src={logo} className={classes.logo} />
            </Button>

            <Tabs
              value={value}
              onChange={handleChange}
              className={classes.tabContainer}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tab}
                component={Link}
                to="/"
                label="Home"
              />
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                className={classes.tab}
                component={Link}
                onMouseOver={(event) => {
                  handleClick(event);
                }}
                to="/services"
                label="Services"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/revolution"
                label="The Revolution"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/about"
                label="About Us"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/contact"
                label="Contact Us"
              />
            </Tabs>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Free Estimate
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
              >
                {menuOptions.map((option, i) => (
                  <MenuItem
                    key={option}
                    component={Link}
                    to={option.link}
                    classes={{ root: classes.menuItem }}
                    onClick={(e) => {
                      handleMenuItemClick(e, i);
                      setValue(1);
                      handleClose();
                    }}
                    selected={selectedIndex === i}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      Hello!
      <div className={classes.toolBarMargin} />
    </React.Fragment>
  );
}

export default Header;
