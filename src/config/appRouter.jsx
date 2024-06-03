import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import Login from "../components/user/Login.jsx";
import CoursesPage from "../pages/CoursesPage.jsx";
import CourseUpdatePage from "../pages/CourseUpdatePage.jsx";
import CoursePage from "../pages/CoursePage.jsx";
import StudentAddPage from "../pages/StudentAddPage.jsx";
import LessonsUpdatePage from "../pages/LessonsUpdatePage.jsx";
import LessonPage from "../pages/LessonPage.jsx";
import LessonListPage from "../pages/LessonListPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/courses", element: <CoursesPage /> },
      { path: "/courses/students", element: <StudentAddPage /> },
      { path: "/lessons/update", element: <LessonsUpdatePage /> },
      { path: "/lessons/:lessonId", element: <LessonPage /> },
      { path: "/lessons", element: <LessonListPage /> },
      { path: "/courses/:courseId", element: <CoursePage /> },
      { path: "/courses/update", element: <CourseUpdatePage /> },
      { path: "/log-in", element: <Login /> },
    ],
  },
]);

export default appRouter;
