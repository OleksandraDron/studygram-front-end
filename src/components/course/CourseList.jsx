import { useState } from "react";
import { useGetCoursesQuery } from "../../api/course/CourseQueries.js";
import { Badge, Button, Container, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import AppLoader from "../common/AppLoader.jsx";
import Paging from "../common/Paging.jsx";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../store/selectors.js";
import { useNavigate } from "react-router-dom";

export default function CourseList() {
  const authUser = useSelector(authUserSelector);
  const navigate = useNavigate();
  const [pageRequest, setPageRequest] = useState({
    size: 5,
    page: 0,
  });

  const { isLoadingCourses, courses } = useGetCoursesQuery(pageRequest);

  if (isLoadingCourses) {
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
        <Typography variant="h5" fontWeight="bold">
          Courses
        </Typography>
        {authUser?.role === "ROLE_LECTOR" && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => navigate("/courses/update")}
          >
            Add new
          </Button>
        )}
      </Stack>
      {courses?.numberOfElements === 0 ? (
        <Box textAlign="center" mt={20}>
          <Typography variant="h6">No courses found</Typography>
        </Box>
      ) : (
        <>
          <Grid mt={2} container spacing={2}>
            {courses.content.map((course) => (
              <Grid item xs={12} key={course.id}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                  justifyContent={{ xs: "flex-end", sm: "space-between" }}
                  onClick={() => navigate(`/courses/${course.id}`)}
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
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        flexWrap="wrap"
                      >
                        {`${course.subject} - ${course.title}`}
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

                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      color="primary"
                      flexWrap="wrap"
                    >
                      {course.description}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    gap={3}
                    spacing={1}
                    p={2}
                    pr={4}
                  >
                    <Badge
                      sx={{ p: { xs: 0, md: 6 } }}
                      color={
                        dayjs(course.startDate).isBefore(dayjs())
                          ? "primary"
                          : "warning"
                      }
                      badgeContent={
                        dayjs(course.endDate).isBefore(dayjs())
                          ? "Finished"
                          : "Actual"
                      }
                    />
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
                count: courses.totalPages,
              }}
              onChange={(page) => setPageRequest({ ...pageRequest, page })}
            />
          </Stack>
        </>
      )}
    </Container>
  );
}
