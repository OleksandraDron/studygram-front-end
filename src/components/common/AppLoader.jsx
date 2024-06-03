import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export default function AppLoader() {
  return (
    <Box className="fixed inset-0 flex items-center justify-center">
      <CircularProgress />
    </Box>
  );
}
