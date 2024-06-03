import {
  Autocomplete,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ClockIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useGetSubjectsQuery } from "../api/subject/SubjectQueries.js";
import dayjs from "dayjs";
import CourseApi from "../api/course/CourseApi.js";
import colors from "tailwindcss/colors";

export default function CourseUpdatePage() {
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [openSubjects, setOpenSubjects] = useState(false);
  const { subjects, isLoadingSubjects } = useGetSubjectsQuery("", openSubjects);

  function onCourseUpdateSubmit(courseDto) {
    async function createCourse() {
      await CourseApi.createCourse({
        ...courseDto,
        subjectId: courseDto.subject.id,
      });
    }

    createCourse().then(() => navigate("/courses"));
  }

  return (
    <Container>
      <Box>
        <Typography variant="h5">Add new course</Typography>
      </Box>
      <Stack mt={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(onCourseUpdateSubmit)}>
            <Stack
              m="auto"
              spacing={2}
              gap={2}
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              justifyItems="center"
              width="50%"
            >
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{
                  required: "Title is required",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Course title"
                    value={value}
                    fullWidth={true}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message ?? null}
                  />
                )}
              />
              <Controller
                name="subject"
                defaultValue=""
                control={control}
                rules={{
                  required: "Subject is required",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    fullWidth={true}
                    open={openSubjects}
                    ListboxProps={{
                      sx: { backgroundColor: colors.stone[100] },
                    }}
                    onOpen={() => {
                      setOpenSubjects(true);
                    }}
                    onClose={() => {
                      setOpenSubjects(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.title === value.title
                    }
                    getOptionLabel={(option) => option.title}
                    options={subjects || []}
                    loading={isLoadingSubjects}
                    onChange={(event, value, reason, details) => {
                      onChange(details.option);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select subject"
                        value={value}
                        error={!!error}
                        helperText={error?.message ?? null}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {isLoadingSubjects ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
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
                    <DatePicker
                      value={value}
                      label="Start date"
                      fullWidth={true}
                      error={!!error}
                      onChange={onChange}
                      helperText={error?.message ?? null}
                    />
                  )}
                />
                <Box>
                  <ClockIcon />
                </Box>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue={dayjs()}
                  rules={{
                    required: "End date is required",
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <DatePicker
                        value={value}
                        label="End date"
                        fullWidth={true}
                        error={!!error}
                        onChange={onChange}
                        helperText={error?.message ?? null}
                      />
                    </>
                  )}
                />
              </Stack>
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
