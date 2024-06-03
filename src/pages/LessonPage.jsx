import { useGetCourseLessonQuery } from "../api/course/CourseQueries.js";
import { useParams } from "react-router-dom";
import AppLoader from "../components/common/AppLoader.jsx";
import { Container, Divider, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import LessonStudentsTable from "../components/students/LessonStudentsTable.jsx";
import { useSelector } from "react-redux";
import { authUserSelector } from "../store/selectors.js";
import StudentLesson from "../components/students/StudentLesson.jsx";

export default function LessonPage() {
  let { lessonId } = useParams();
  const authUser = useSelector(authUserSelector);
  const { isLoadingLesson, lesson } = useGetCourseLessonQuery(lessonId);

  if (isLoadingLesson) {
    return <AppLoader />;
  }

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            {lesson.title} - {lesson.course.title}
          </Typography>
          <Typography
            variant="h7"
            border={1}
            borderRadius={2}
            borderColor="primary.main"
            px={1}
            py={0.5}
            flexWrap="wrap"
          >
            {`${dayjs(lesson.startDate).format("MMM D, HH:mm")} - ${dayjs(lesson.endDate).format("HH:mm")}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">{lesson.description ?? ""}</Typography>
      </Stack>
      <Box my={4}>
        <Divider />
      </Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">Course teachers:</Typography>
        {lesson?.teachers?.map((teacher) => (
          <Typography key={teacher.id} variant="body1">
            {teacher.position} - {teacher.firstname} {teacher.lastname} |
          </Typography>
        ))}
      </Stack>
      <Box my={4}>
        <Divider />
      </Box>
      {authUser?.role === "ROLE_LECTOR" && (
        <LessonStudentsTable lessonId={lesson?.id} />
      )}
      {authUser?.role === "ROLE_STUDENT" && <StudentLesson lesson={lesson} />}
    </Container>
  );
}
