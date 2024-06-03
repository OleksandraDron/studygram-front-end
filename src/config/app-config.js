import { QueryClient } from "@tanstack/react-query";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleServerError } from "./exception.js";

export const createAppAsyncThunk = (typePrefix, payloadCreator) =>
  createAsyncThunk(typePrefix, payloadCreator);

export function appThunkErrorHandler(payloadCreator) {
  return async (args, thunkAPI) => {
    try {
      return await payloadCreator(args, thunkAPI);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleServerError(error));
    }
  };
}

const defaultOptions = {
  queries: {
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
