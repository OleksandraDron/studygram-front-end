import axios from "axios";
import localforage from "localforage";
import { toast } from "react-toastify";
import queryString from "query-string";
import { ServerError } from "../config/exception.js";

export class AxiosApiService {
  baseAxios = axios.create({
    paramsSerializer: (params) => queryString.stringify(params),
    baseURL: "http://localhost:8080/api/v1",
  });

  constructor() {
    this.baseAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { config, response } = error;

        if (!response) {
          return Promise.reject(new ServerError());
        }

        const { status } = response;
        const responseNotParsed =
          response?.data instanceof Blob &&
          response?.data.type === "application/json"
            ? await response?.data?.text()
            : response?.data || {};

        const responseParsed =
          typeof responseNotParsed === "string"
            ? JSON.parse(responseNotParsed)
            : responseNotParsed;

        if (status === 401) {
          await localforage.removeItem("accessToken");
          return Promise.reject();
        }

        const serverError = new ServerError(responseParsed);

        if (status === 400) {
          if (!config.hideError) {
            toast.error(responseParsed.message || "Server API error");
          }
          return Promise.reject(serverError);
        } else if (status === 403) {
          const err = new ServerError(responseParsed);
          if (!config.hideError) {
            toast.error(
              err.message || "You are not allowed to perform this operation",
            );
          }
          return Promise.reject(err);
        }

        if (!config.params?.silent && !config.hideError) {
          toast.error(serverError.message || "Unknown server error");
        }

        return Promise.reject(serverError);
      },
    );

    this.baseAxios.interceptors.request.use(
      async (req) => {
        const token = await localforage.getItem("accessToken");

        if (!token) {
          return req;
        }

        req.headers["Authorization"] = "Bearer " + token;
        return req;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  postRequest(url, data, config) {
    return this.baseAxios.post(url, data, config);
  }

  getRequest(url, config) {
    return this.baseAxios.get(url, config);
  }

  deleteRequest(url, config) {
    return this.baseAxios.delete(url, config);
  }

  patchRequest(url, data, config) {
    return this.baseAxios.patch(url, data, config);
  }

  putRequest(url, data, config) {
    return this.baseAxios.put(url, data, config);
  }
}

export const ApiService = new AxiosApiService();
