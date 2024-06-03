import { ApiService } from "../api-service.js";

export default class CourseAnalysisApi {
  static async getCourseAnalysis(courseId) {
    return ApiService.getRequest(
      `/private/courses/${courseId}/progress/analysis`,
    );
  }

  static async getCourseAvgAnalysis(courseId) {
    return ApiService.getRequest(
      `/private/courses/${courseId}/progress/avg/analysis`,
    );
  }

  static async getCourseGradesAnalysis(courseId) {
    return ApiService.getRequest(
      `/private/courses/${courseId}/progress/grades/analysis`,
    );
  }

  static async getCourseBarsAnalysis(courseId) {
    return ApiService.getRequest(
      `/private/courses/${courseId}/progress/bars/analysis`,
    );
  }
  static async getCourseStudentAnalysis(courseId) {
    return ApiService.getRequest(
      `/private/courses/${courseId}/students/progress/analysis`,
    );
  }
  static async getCourseStudentGradesAnalysis(courseId) {
    return ApiService.getRequest(
      `/private/courses/${courseId}/students/progress/grades/analysis`,
    );
  }
}
