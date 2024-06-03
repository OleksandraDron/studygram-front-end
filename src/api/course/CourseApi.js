import { ApiService } from "../api-service.js";

export default class CourseApi {
  static async getCourses(pageRequest) {
    return ApiService.getRequest("/private/subjects/courses", {
      params: { ...pageRequest },
    });
  }

  static async getCourse(courseId) {
    return ApiService.getRequest(`/private/subjects/courses/${courseId}`);
  }

  static async getCourseStudents(courseId) {
    return ApiService.getRequest(
      `/private/subjects/courses/${courseId}/students`,
    );
  }

  static async getStudentFlows() {
    return ApiService.getRequest(`/private/students/flows`);
  }

  static async getCourseLessons(courseId, pageRequest) {
    return ApiService.getRequest(
      `/private/subjects/courses/${courseId}/lessons`,
      {
        params: { ...pageRequest },
      },
    );
  }
  static async getAllLessons(onlyToday = false, pageRequest) {
    return ApiService.getRequest(`/private/subjects/courses/lessons`, {
      params: { ...pageRequest, onlyToday },
    });
  }
  static async getCourseLesson(lessonId) {
    return ApiService.getRequest(
      `/private/subjects/courses/lessons/${lessonId}`,
    );
  }
  static async getStudentLesson(lessonId) {
    return ApiService.getRequest(
      `/private/subjects/courses/lessons/${lessonId}/students/me`,
    );
  }
  static async getLessonStudents(lessonId) {
    return ApiService.getRequest(
      `/private/subjects/courses/lessons/${lessonId}/students`,
    );
  }
  static async patchLessonStudent({ studentId, lessonId, updateDto }) {
    return ApiService.patchRequest(
      `/private/subjects/courses/lessons/${lessonId}/students/${studentId}`,
      updateDto,
    );
  }

  static async addStudentFlowsToCourse({ courseId, studentFlowCodes }) {
    return ApiService.patchRequest(
      `/private/subjects/courses/${courseId}/students`,
      { studentFlowCodes },
    );
  }
  static async deleteStudentFromCourse({ courseId, studentId }) {
    return ApiService.deleteRequest(
      `/private/subjects/courses/${courseId}/students/${studentId}`,
    );
  }

  static async deleteCourse(courseId) {
    return ApiService.deleteRequest(`/private/subjects/courses/${courseId}`);
  }

  static async createCourse(courseDto) {
    return ApiService.postRequest("/private/subjects/courses", courseDto);
  }
  static async createCourseLessons({ courseId, lessonsDto }) {
    return ApiService.postRequest(
      `/private/subjects/courses/${courseId}/lessons`,
      lessonsDto,
    );
  }
}
