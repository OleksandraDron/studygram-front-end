import { Badge, Button, Grid, Stack } from "@mui/material";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetCourseLessonsQuery } from "../../api/course/CourseQueries.js";
import dayjs from "dayjs";
import Paging from "../common/Paging.jsx";
import AppLoader from "../common/AppLoader.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../store/selectors.js";

export default function CourseLessons({ course }) {
  const authUser = useSelector(authUserSelector);
  const [pageRequest, setPageRequest] = useState({
    size: 8,
    page: 0,
  });
  const { isLoadingLessons, lessons } = useGetCourseLessonsQuery(
    course?.id,
    pageRequest,
  );
  const navigate = useNavigate();

  if (isLoadingLessons) {
    return <AppLoader />;
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Course lessons:</Typography>
        {authUser?.role === "ROLE_LECTOR" && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => navigate("/lessons/update", { state: { course } })}
          >
            Add lessons
          </Button>
        )}
      </Stack>
      {lessons?.numberOfElements === 0 ? (
        <Box textAlign="center" mt={10}>
          <Typography variant="h6">No lessons found</Typography>
        </Box>
      ) : (
        <>
          <Grid mt={2} container spacing={2}>
            {lessons.content.map((lesson) => (
              <Grid item xs={12} key={lesson.id}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="center"
                  justifyContent={{ xs: "flex-end", sm: "space-between" }}
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                  className="bg-white"
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
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        fontWeight="bold"
                        variant="h6"
                        flexWrap="wrap"
                      >
                        {lesson.title}
                      </Typography>
                      <Typography flexWrap="wrap">
                        {`${dayjs(lesson.startDate).format("MMM D, HH:mm")} - ${dayjs(lesson.endDate).format("HH:mm")}`}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="h7"
                      fontWeight="bold"
                      color="primary"
                      flexWrap="wrap"
                    >
                      {lesson.description || ""}
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
                      color={
                        dayjs(lesson.startDate).isSame(dayjs(), "day")
                          ? "primary"
                          : dayjs(lesson.startDate).isBefore(dayjs(), "day")
                            ? "info"
                            : "warning"
                      }
                      badgeContent={
                        dayjs(lesson.startDate).isSame(dayjs(), "day")
                          ? "Today"
                          : dayjs(lesson.startDate).isBefore(dayjs(), "day")
                            ? "Past"
                            : "Future"
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
                count: lessons.totalPages,
              }}
              onChange={(page) => setPageRequest({ ...pageRequest, page })}
            />
          </Stack>
        </>
      )}
    </Box>
  );
}
