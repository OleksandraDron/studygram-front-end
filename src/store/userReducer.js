import { createSlice } from "@reduxjs/toolkit";
import * as localForage from "localforage";
import {
  appThunkErrorHandler,
  createAppAsyncThunk,
} from "../config/app-config.js";
import UserApi from "../api/user/UserApi.js";

export const fetchAuthUser = createAppAsyncThunk(
  "user/fetchAuthUser",
  appThunkErrorHandler(async () => {
    const accessToken = await localForage.getItem("accessToken");

    if (!accessToken) {
      return {
        authUser: null,
      };
    }

    const { data } = await UserApi.getAuthUser();

    return {
      authUser: data,
    };
  }),
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
  },
  reducers: {
    updateAuthUser(state, { payload }) {
      state.authUser = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthUser.rejected, (state) => {
      state.authUser = null;
    });

    builder.addCase(fetchAuthUser.fulfilled, (state, { payload }) => {
      state.authUser = payload.authUser;
    });
  },
});

export const {
  reducer: userReducer,
  actions: { updateAuthUser },
} = userSlice;
