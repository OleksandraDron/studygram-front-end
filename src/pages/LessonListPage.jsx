import { useGetAllLessonsQuery } from "../api/course/CourseQueries.js";
import { useNavigate } from "react-router-dom";
import AppLoader from "../components/common/AppLoader.jsx";
import { Container, Divider, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import { useState } from "react";
import Paging from "../components/common/Paging.jsx";

export default function LessonListPage() {
  const navigate = useNavigate();
  const [pageRequest, setPageRequest] = useState({
    size: 10,
    page: 0,
  });
  const { isLoadingAllLessons, allLessons } = useGetAllLessonsQuery(
    false,
    pageRequest,
  );
  const {
    isLoadingAllLessons: isLoadingAllTodayLessons,
    allLessons: allTodayLessons,
  } = useGetAllLessonsQuery(true, { size: 100, page: 0 });

  if (isLoadingAllLessons || isLoadingAllTodayLessons) {
    return <AppLoader />;
  }

  return (
    <Container>
      {allTodayLessons?.numberOfElements !== 0 && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" fontWeight="bold">
              Today lessons
            </Typography>
          </Stack>
          <Grid mt={2} container spacing={2}>
            {allTodayLessons.content.map((lesson) => (
              <Grid item xs={12} key={lesson.id}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                  sx={{
                    p: 2,
                    boxShadow: 3,
                    borderRadius: "10px",
                    "&:hover": {
                      border: 2,
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Stack
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                    gap={1}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography variant="h6">
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
                        {`Today ${dayjs(lesson.startDate).format("HH:mm")} - ${dayjs(lesson.endDate).format("HH:mm")}`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Box my={4}>
        <Divider />
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          p: 2,
        }}
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          All lessons
        </Typography>
      </Stack>
      {allLessons?.numberOfElements === 0 ? (
        <Box textAlign="center" mt={20}>
          <Typography variant="h6">No lessons found</Typography>
        </Box>
      ) : (
        <>
          <Grid mt={2} container spacing={2}>
            {allLessons.content.map((lesson) => (
              <Grid item xs={12} key={lesson.id}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                  sx={{
                    p: 2,
                    boxShadow: 3,
                    borderRadius: "10px",
                    "&:hover": {
                      border: 2,
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <Stack
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                    gap={1}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
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

                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      color="primary"
                      flexWrap="wrap"
                    >
                      {lesson.description ?? ""}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h7">Course teachers:</Typography>
                      {lesson?.teachers?.map((teacher) => (
                        <Typography key={teacher.id} variant="body1">
                          {teacher.position} - {teacher.firstname}{" "}
                          {teacher.lastname} |
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Stack alignItems="center" mt={2}>
            <Paging
              className="mt-8"
              pageInfo={{
                page: pageRequest.page,
                count: allLessons.totalPages,
              }}
              onChange={(page) => setPageRequest({ ...pageRequest, page })}
            />
          </Stack>
        </>
      )}
    </Container>
  );
}
