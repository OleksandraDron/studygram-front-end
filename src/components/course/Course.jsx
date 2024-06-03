import { Button, Container, Divider, Stack } from "@mui/material";

import StudentsTable from "../students/StudentsTable.jsx";
import CourseLessons from "./CourseLessons.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../store/selectors.js";
import CourseApi from "../../api/course/CourseApi.js";
import { useNavigate } from "react-router-dom";
import AppModal from "../common/AppModal.jsx";
import { useState } from "react";
import dayjs from "dayjs";
import LecturerCourseAnalysis from "./LecturerCourseAnalysis.jsx";
import StudentCourseAnalysis from "./StudentCourseAnalysis.jsx";

export default function Course({ course }) {
  const authUser = useSelector(authUserSelector);
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function handleCourseDelete() {
    async function deleteCourse() {
      await CourseApi.deleteCourse(course.id);
    }

    deleteCourse().then(() => navigate(-1));
  }

  return (
    <Container>
      <AppModal
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        message="Are you sure you want to delete this course?"
        onSubmit={handleCourseDelete}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Course: {course.subject} - {course.title}
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
            {`${dayjs(course.startDate).format("MMMM DD")} - ${dayjs(course.endDate).format("MMMM DD")}`}
          </Typography>
        </Stack>

        {authUser?.role === "ROLE_LECTOR" && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </Button>
        )}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body1">{course.description}</Typography>
      </Stack>
      {authUser?.role === "ROLE_LECTOR" && (
        <LecturerCourseAnalysis course={course} />
      )}
      {authUser?.role === "ROLE_STUDENT" && (
        <StudentCourseAnalysis course={course} />
      )}
      {authUser?.role === "ROLE_LECTOR" && <StudentsTable course={course} />}
      <Box my={4}>
        <Divider />
      </Box>
      <CourseLessons course={course} />
    </Container>
  );
}
