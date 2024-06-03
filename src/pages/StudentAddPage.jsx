import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import colors from "tailwindcss/colors";
import { useGetStudentFlowsQuery } from "../api/course/CourseQueries.js";
import CourseApi from "../api/course/CourseApi.js";

export default function StudentAddPage() {
  const { state } = useLocation();
  const course = state.course;
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [openStudentFlows, setOpenStudentFlows] = useState(false);
  const { studentFlows, isLoadingStudentFlows } = useGetStudentFlowsQuery();

  function onAddStudentsSubmit(studentFlowsDto) {
    console.log(studentFlowsDto);
    async function createCourse() {
      await CourseApi.addStudentFlowsToCourse({
        courseId: course.id,
        studentFlowCodes: studentFlowsDto?.flows?.map((flow) => flow.flowCode),
      });
    }

    createCourse().then(() => navigate(-1));
  }

  return (
    <Container>
      <Box>
        <Typography variant="h6">
          Add students to {course.subject} - {course.title}
        </Typography>
      </Box>
      <Stack mt={4}>
        <form onSubmit={handleSubmit(onAddStudentsSubmit)}>
          <Stack
            m="auto"
            spacing={2}
            gap={2}
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            justifyItems="center"
            width="100%"
          >
            <Controller
              name="flows"
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
                  multiple={true}
                  fullWidth={true}
                  open={openStudentFlows}
                  ListboxProps={{
                    sx: { backgroundColor: colors.stone[100] },
                  }}
                  onOpen={() => {
                    setOpenStudentFlows(true);
                  }}
                  onClose={(event, reason) => {
                    if (reason !== "selectOption" && reason !== "removeOption")
                      setOpenStudentFlows(false);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) =>
                    `${option.title} - ${option.flowCode}`
                  }
                  getOptionKey={(option) => option.id}
                  options={studentFlows || []}
                  loading={isLoadingStudentFlows}
                  onChange={(event, newValue, reason, details) => {
                    onChange(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant={"outlined"}
                          color={"primary"}
                          size={"small"}
                          key={key}
                          label={option.title}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select student flows"
                      value={value}
                      error={!!error}
                      helperText={error?.message ?? null}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingStudentFlows ? (
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
          </Stack>
          <Stack
            mt={3}
            textAlign="center"
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(-1)}
            >
              cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
