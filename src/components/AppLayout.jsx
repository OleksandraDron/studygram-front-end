import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAuthUser } from "../store/userReducer.js";
import AppLoader from "./common/AppLoader.jsx";
import AppMenuBar from "./header/AppMenuBar.jsx";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

export default function AppLayout() {
  const dispatch = useDispatch();
  const [isFetchingAuthUser, setIsFetchingAuthUser] = useState(true);

  useEffect(() => {
    async function getAuthUser() {
      await dispatch(fetchAuthUser());
      setTimeout(() => setIsFetchingAuthUser(false), 1500); //todo update to 1500
    }

    getAuthUser();
  }, [dispatch]);

  if (isFetchingAuthUser) {
    return <AppLoader />;
  }

  return (
    <Box className="bg-stone-200 min-h-screen">
      <Container sx={{ px: { xs: 0 } }}>
        <Box className="bg-stone-100 min-h-screen">
          <AppMenuBar />
          <Box p={4}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
