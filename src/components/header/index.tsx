import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

import { sections } from "../../contants";

const Header = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setShowHeader(lastScrollY > currentScrollY || currentScrollY < 10);
    lastScrollY = currentScrollY;

    sections.forEach((section, index) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveTab(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: 1
        }}
        elevation={0}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: isSmallDevice ? 0 :"11rem",
            marginRight: isSmallDevice ? 0 : "11rem",
          }}
        >
          <Typography color="primary" sx={{ fontWeight: "400", fontSize:'1.9rem' }}>
             <i> Bidyut Talukdar</i>
          </Typography>
          {!isSmallDevice && (
            <div className="hidden md:flex">
              <Tabs
                value={activeTab}
                // onChange={(newValue) => setActiveTab(newValue)}
                textColor="primary"
                indicatorColor="primary"
              >
                {sections.map((section, index) => (
                  <Tab
                    key={index}
                    label={section.charAt(0).toUpperCase() + section.slice(1)}
                    onClick={() => {
                      const element = document.getElementById(section);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                      setActiveTab(index);
                    }}
                  />
                ))}
              </Tabs>
            </div>
          )}

          {isSmallDevice && (
            <div className="flex md:hidden">
              <IconButton color="primary" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isSmallDevice && (
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
          <List>
            {sections.map((section, index) => (
              <ListItem
                component="button"
                key={section}
                onClick={() => {
                  const element = document.getElementById(section);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  setActiveTab(index);
                  setMobileOpen(false);
                }}
                sx={{ textAlign: "left" , backgroundColor: "white",}} // Optional: Ensures left-aligned text inside button
              >
                <ListItemText
                  primary={section.charAt(0).toUpperCase() + section.slice(1)}
                  sx={{ color: theme.palette.primary.main }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </motion.div>
  );
};

export default Header;
