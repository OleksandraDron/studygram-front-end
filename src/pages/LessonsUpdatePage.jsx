import {
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  CalendarIcon,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CourseApi from "../api/course/CourseApi.js";
import AppLoader from "../components/common/AppLoader.jsx";

export default function LessonsUpdatePage() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const course = state.course;
  console.log(state.course);
  if (!course) {
    return <AppLoader />;
  }

  function onCourseLessonsSubmit(lessonsDto) {
    async function createCourseLessons() {
      await CourseApi.createCourseLessons({
        courseId: course.id,
        lessonsDto,
      });
    }

    createCourseLessons().then(() => navigate(-1));
  }

  return (
    <Container>
      <Box>
        <Typography variant="h5">
          Add lessons to {course.title} course
        </Typography>
      </Box>
      <Stack mt={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(onCourseLessonsSubmit)}>
            <Stack
              m="auto"
              spacing={2}
              gap={2}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              justifyItems="center"
              width="60%"
            >
              <Controller
                name="title"
                control={control}
                defaultValue="Lecture"
                rules={{
                  required: "Lesson title is required",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Lesson title*"
                    value={value}
                    fullWidth={true}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ?? null}
                  />
                )}
              />
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ width: "100%" }}
                alignItems="center"
              >
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue={dayjs()}
                  rules={{
                    required: "Start date is required",
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DateTimePicker
                      ampm={false}
                      value={value}
                      label="Start date & time*"
                      sx={{ width: "50%" }}
                      error={!!error}
                      onChange={onChange}
                      helperText={error?.message ?? null}
                    />
                  )}
                />
                <Controller
                  name="duration"
                  control={control}
                  defaultValue={95}
                  rules={{
                    required: "Duration is required",
                    min: {
                      value: 5,
                      message: "Min value is 5 minutes",
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      value={value}
                      margin="dense"
                      sx={{ width: "50%" }}
                      label="Duration (minutes)*"
                      type="number"
                      variant="outlined"
                      error={!!error}
                      onChange={onChange}
                      helperText={error?.message ?? null}
                    />
                  )}
                />
              </Stack>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Lesson description"
                    value={value}
                    fullWidth={true}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ?? null}
                  />
                )}
              />
              <Controller
                name="repeatEveryNDays"
                control={control}
                defaultValue={0}
                rules={{
                  required: "Repeat every N days is required",
                  min: {
                    value: 0,
                    message: "Repeat every N days should be at least 0",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    value={value}
                    margin="dense"
                    fullWidth={true}
                    label="Repeat every N days, if 0 - no repeats*"
                    type="number"
                    variant="outlined"
                    error={!!error}
                    onChange={onChange}
                    helperText={error?.message ?? null}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
            <Box mt={3} textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </LocalizationProvider>
      </Stack>
    </Container>
  );
}
