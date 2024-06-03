import { ApiService } from "../api-service.js";

export default class UserApi {
  static async getAuthUser() {
    return ApiService.getRequest("/private/users/auth", {
      hideError: true,
    });
  }

  static async logIn(logInDto) {
    return ApiService.postRequest("/public/users/log-in", logInDto);
  }
}
