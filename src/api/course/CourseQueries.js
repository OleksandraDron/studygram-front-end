import CourseApi from "./CourseApi.js";
import { useQuery } from "@tanstack/react-query";

export function useGetCoursesQuery(pageRequest) {
  const getCoursesQueryKey = "courses/get";
  const { isLoading, data } = useQuery({
    queryKey: [getCoursesQueryKey, pageRequest],
    queryFn: () => CourseApi.getCourses(pageRequest).then((res) => res.data),
    keepPreviousData: true,
  });

  return {
    getCoursesQueryKey,
    isLoadingCourses: isLoading,
    courses: data,
  };
}

export function useGetCourseQuery(courseId) {
  const getCourseQueryKey = "courses/get/id";
  const { isLoading, data } = useQuery({
    queryKey: [getCourseQueryKey, courseId],
    queryFn: () => CourseApi.getCourse(courseId).then((res) => res.data),
    enabled: !!courseId,
  });

  return {
    getCourseQueryKey,
    isLoadingCourse: isLoading,
    course: data,
  };
}
export function useGetCourseStudentsQuery(courseId) {
  const courseStudentsQueryKey = "courses/students/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseStudentsQueryKey, courseId],
    queryFn: () =>
      CourseApi.getCourseStudents(courseId).then((res) => res.data),
    enabled: !!courseId,
  });

  return {
    courseStudentsQueryKey,
    isLoadingStudents: isLoading,
    courseStudents: data,
  };
}
export function useGetStudentFlowsQuery() {
  const studentFlowsQueryKey = "students/flows/get";
  const { isLoading, data } = useQuery({
    queryKey: [studentFlowsQueryKey],
    queryFn: () => CourseApi.getStudentFlows().then((res) => res.data),
    keepPreviousData: true,
  });

  return {
    studentFlowsQueryKey,
    isLoadingStudentFlows: isLoading,
    studentFlows: data,
  };
}
export function useGetCourseLessonsQuery(courseId, pageRequest) {
  const courseLessonsQueryKey = "courses/lesson/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseLessonsQueryKey, courseId, pageRequest],
    queryFn: () =>
      CourseApi.getCourseLessons(courseId, pageRequest).then((res) => res.data),
    keepPreviousData: true,
    enabled: !!courseId,
  });

  return {
    courseLessonsQueryKey,
    isLoadingLessons: isLoading,
    lessons: data,
  };
}
export function useGetCourseLessonQuery(lessonId) {
  const courseLessonQueryKey = "courses/lesson/get/id";
  const { isLoading, data } = useQuery({
    queryKey: [courseLessonQueryKey, lessonId],
    queryFn: () => CourseApi.getCourseLesson(lessonId).then((res) => res.data),
    enabled: !!lessonId,
  });

  return {
    courseLessonQueryKey,
    isLoadingLesson: isLoading,
    lesson: data,
  };
}
export function useGetLessonStudentsQuery(lessonId) {
  const lessonStudentsQueryKey = "courses/lesson/students/get";
  const { isLoading, data } = useQuery({
    queryKey: [lessonStudentsQueryKey, lessonId],
    queryFn: () =>
      CourseApi.getLessonStudents(lessonId).then((res) => res.data),
    enabled: !!lessonId,
  });

  return {
    lessonStudentsQueryKey,
    isLoadingLessonStudents: isLoading,
    lessonStudents: data,
  };
}
export function useGetAllLessonsQuery(onlyToday = false, pageRequest) {
  const allLessonsQueryKey = "lessons/get";
  const { isLoading, data } = useQuery({
    queryKey: [allLessonsQueryKey, onlyToday, pageRequest],
    queryFn: () =>
      CourseApi.getAllLessons(onlyToday, pageRequest).then((res) => res.data),
    keepPreviousData: true,
  });

  return {
    allLessonsQueryKey,
    isLoadingAllLessons: isLoading,
    allLessons: data,
  };
}
export function useGetStudentLessonQuery(lessonId) {
  const studentLessonQueryKey = "lessons/get";
  const { isLoading, data } = useQuery({
    queryKey: [studentLessonQueryKey, lessonId],
    queryFn: () => CourseApi.getStudentLesson(lessonId).then((res) => res.data),
    enabled: !!lessonId,
  });

  return {
    studentLessonQueryKey,
    isLoadingStudentLesson: isLoading,
    studentLesson: data,
  };
}
