import { Controller, useForm } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../config/app-config.js";
import { updateAuthUser } from "../../store/userReducer.js";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserApi from "../../api/user/UserApi.js";
export default function Login() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleUserLogIn(userLogInDto) {
    await queryClient.clear();
    await localforage.setItem("accessToken", userLogInDto.accessToken);
    await dispatch(updateAuthUser(userLogInDto.user));
    navigate("/courses");
  }

  function onLoginSubmit(logInDto) {
    async function logInUser() {
      const { data } = await UserApi.logIn(logInDto);
      return data;
    }

    logInUser().then((userLogInDto) => {
      handleUserLogIn(userLogInDto);
    });
  }

  return (
    <Stack
      m="auto"
      mt={8}
      width="50%"
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
    >
      <Typography m="auto" variant="h5" fontWeight="bold">
        <p>Login to your account</p>
      </Typography>
      <Box className="mt-6" />
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <Stack
          m="auto"
          spacing={2}
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          justifyItems="center"
          width="75%"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Email"
                value={value}
                fullWidth={true}
                onChange={onChange}
                error={!!error}
                helperText={error?.message ?? null}
              />
            )}
          />
          <Box className="mt-4" />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Password"
                value={value}
                onChange={onChange}
                fullWidth={true}
                error={!!error}
                helperText={error?.message ?? null}
                type={"password"}
              />
            )}
          />
        </Stack>
        <Box mt={3} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Stack>
  );
}
