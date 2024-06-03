import { useQuery } from "@tanstack/react-query";
import CourseAnalysisApi from "./CourseAnalysisApi.js";

export function useGetCourseAnalysisQuery(courseId) {
  const courseAnalysisQueryKey = "courses/analysis/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseAnalysisQueryKey, courseId],
    queryFn: () =>
      CourseAnalysisApi.getCourseAnalysis(courseId).then((res) => res.data),
    enabled: !!courseId,
  });

  return {
    courseAnalysisQueryKey,
    isLoadingCourseAnalysis: isLoading,
    courseAnalysis: data,
  };
}

export function useGetCourseAvgAnalysisQuery(courseId) {
  const courseAvgAnalysisQueryKey = "courses/analysis/avg/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseAvgAnalysisQueryKey, courseId],
    queryFn: () =>
      CourseAnalysisApi.getCourseAvgAnalysis(courseId).then((res) => res.data),
    enabled: !!courseId,
  });

  return {
    courseAvgAnalysisQueryKey,
    isLoadingCourseAvgAnalysis: isLoading,
    courseAvgAnalysis: data,
  };
}

export function useGetCourseGradesAnalysisQuery(courseId) {
  const courseGradesAnalysisQueryKey = "courses/analysis/grades/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseGradesAnalysisQueryKey, courseId],
    queryFn: () =>
      CourseAnalysisApi.getCourseGradesAnalysis(courseId).then(
        (res) => res.data,
      ),
    enabled: !!courseId,
  });

  return {
    courseGradesAnalysisQueryKey,
    isLoadingCourseGradesAnalysis: isLoading,
    courseGradesAnalysis: data,
  };
}

export function useGetCourseBarsAnalysisQuery(courseId) {
  const courseBarsAnalysisQueryKey = "courses/analysis/bars/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseBarsAnalysisQueryKey, courseId],
    queryFn: () =>
      CourseAnalysisApi.getCourseBarsAnalysis(courseId).then((res) => res.data),
    enabled: !!courseId,
  });

  return {
    courseBarsAnalysisQueryKey,
    isLoadingCourseBarsAnalysis: isLoading,
    courseBarsAnalysis: data,
  };
}

export function useGetCourseStudentAnalysisQuery(courseId) {
  const courseStudentAnalysisQueryKey = "courses/analysis/student/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseStudentAnalysisQueryKey, courseId],
    queryFn: () =>
      CourseAnalysisApi.getCourseStudentAnalysis(courseId).then(
        (res) => res.data,
      ),
    enabled: !!courseId,
  });

  return {
    courseStudentAnalysisQueryKey,
    isLoadingCourseStudentAnalysis: isLoading,
    courseStudentAnalysis: data,
  };
}

export function useGetCourseStudentGradesAnalysisQuery(courseId) {
  const courseStudentGradesAnalysisQueryKey =
    "courses/analysis/grades/student/get";
  const { isLoading, data } = useQuery({
    queryKey: [courseStudentGradesAnalysisQueryKey, courseId],
    queryFn: () =>
      CourseAnalysisApi.getCourseStudentGradesAnalysis(courseId).then(
        (res) => res.data,
      ),
    enabled: !!courseId,
  });

  return {
    courseStudentGradesAnalysisQueryKey,
    isLoadingCourseStudentGradesAnalysis: isLoading,
    courseStudentGradesAnalysis: data,
  };
}
