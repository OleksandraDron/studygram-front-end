import Course from "../components/course/Course.jsx";
import { useGetCourseQuery } from "../api/course/CourseQueries.js";
import { useParams } from "react-router-dom";
import AppLoader from "../components/common/AppLoader.jsx";

export default function CoursePage() {
  let { courseId } = useParams();
  const { isLoadingCourse, course } = useGetCourseQuery(courseId);

  if (isLoadingCourse) {
    return <AppLoader />;
  }

  return (
    <>
      <Course course={course} />
    </>
  );
}
