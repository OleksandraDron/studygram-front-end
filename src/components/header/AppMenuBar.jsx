import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Login, Logout } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import localForage from "localforage";
import { queryClient } from "../../config/app-config.js";
import { authUserSelector } from "../../store/selectors.js";

export default function AppMenuBar() {
  const authUser = useSelector(authUserSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    await localForage.removeItem("accessToken");
    await dispatch({ type: "LOG_OUT_CLEAN" });
    navigate("/log-in");
    queryClient.clear();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" flexGrow={1}>
            <Typography variant="h5" component="div">
              Studygram
            </Typography>
            {authUser && (
              <>
                <Button
                  onClick={() => {
                    navigate("/courses");
                  }}
                  size="small"
                  sx={{ color: "white", ml: 4 }}
                >
                  Courses
                </Button>
                <Button
                  onClick={() => {
                    navigate("/lessons");
                  }}
                  size="small"
                  sx={{ color: "white", ml: 2 }}
                >
                  Lessons
                </Button>
              </>
            )}
          </Stack>
          {authUser ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    onClick={handleLogout}
                  >
                    <Logout fontSize="small" />
                    <Typography variant="body2"> Log out</Typography>
                  </Stack>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate("/log-in")}
                color="inherit"
              >
                <Login />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
