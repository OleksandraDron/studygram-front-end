import { ApiService } from "../api-service.js";

export default class SubjectApi {
  static async getSubjects(search) {
    return ApiService.getRequest("/public/subjects", {
      params: { name: search || "" },
    });
  }
}
