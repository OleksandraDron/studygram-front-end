import {
  Button,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import CourseApi from "../../api/course/CourseApi.js";
import { toast } from "react-toastify";
import { useGetStudentLessonQuery } from "../../api/course/CourseQueries.js";
import AppLoader from "../common/AppLoader.jsx";
import dayjs from "dayjs";
import { useState } from "react";
import AppModal from "../common/AppModal.jsx";
import { Controller, useForm } from "react-hook-form";
import { queryClient } from "../../config/app-config.js";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../store/selectors.js";

export default function StudentLesson({ lesson }) {
  const authUser = useSelector(authUserSelector);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { control, handleSubmit } = useForm();
  const { isLoadingStudentLesson, studentLesson, studentLessonQueryKey } =
    useGetStudentLessonQuery(lesson?.id);
  const updateStudentLesson = useMutation({
    mutationFn: CourseApi.patchLessonStudent,
    onSuccess: () => {
      toast.success("Updated successfully");
      queryClient.invalidateQueries(studentLessonQueryKey);
      setOpenUpdateDialog(false);
    },
  });

  const canBeUpdated =
    dayjs(lesson.startDate).isBefore(dayjs()) &&
    dayjs(lesson.endDate).isAfter(dayjs());

  function handleStudentLessonUpdate(updateDto) {
    updateStudentLesson.mutate({
      studentId: authUser.id,
      lessonId: lesson.id,
      updateDto,
    });
  }

  if (isLoadingStudentLesson) {
    return <AppLoader />;
  }

  return (
    <>
      {openUpdateDialog && (
        <AppModal
          isOpen={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(false)}
          message={`Update presence on the lesson`}
          onSubmit={handleSubmit(handleStudentLessonUpdate)}
        >
          <Stack spacing={2} gap={1} minWidth={500}>
            <Typography>Presence state*</Typography>
            <Controller
              rules={{ required: true }}
              control={control}
              defaultValue={
                studentLesson.presentState === "NONE"
                  ? "PRESENT"
                  : studentLesson.presentState
              }
              name="presentState"
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="NONE"
                    control={<Radio />}
                    label="None"
                  />
                  <FormControlLabel
                    value="PRESENT"
                    control={<Radio />}
                    label="Present"
                  />
                  <FormControlLabel
                    value="ABSENT"
                    control={<Radio />}
                    label="Absent"
                  />
                </RadioGroup>
              )}
            />
            <Controller
              name="interest"
              control={control}
              defaultValue={studentLesson.interest || 0}
              rules={{
                required: "Interest is required",
                min: {
                  value: 0,
                  message: "Min value is 0",
                },
                max: {
                  value: 5,
                  message: "Max value is 5",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Typography>How interesting was the lesson?*</Typography>
                  <Rating
                    size="large"
                    value={+value}
                    precision={1}
                    max={5}
                    onChange={onChange}
                  />
                  <FormHelperText error={!!error}>
                    {error?.message ?? null}
                  </FormHelperText>
                </>
              )}
            />
            <Controller
              name="relevance"
              control={control}
              defaultValue={studentLesson.relevance || 0}
              rules={{
                required: "Relevance is required",
                min: {
                  value: 0,
                  message: "Min value is 0",
                },
                max: {
                  value: 5,
                  message: "Max value is 5",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Typography>Was the lesson relevant?*</Typography>
                  <Rating
                    size="large"
                    value={+value}
                    precision={1}
                    max={5}
                    onChange={onChange}
                  />
                  <FormHelperText error={!!error}>
                    {error?.message ?? null}
                  </FormHelperText>
                </>
              )}
            />
          </Stack>
        </AppModal>
      )}
      <Stack spacing={2} gap={1} minWidth={500}>
        {canBeUpdated && (
          <Button variant="outlined" onClick={() => setOpenUpdateDialog(true)}>
            Update presence
          </Button>
        )}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontWeight="bold">Presence on the lesson:</Typography>
          <Typography>{studentLesson.presentState}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontWeight="bold">Mark for the lesson:</Typography>
          <Typography>{studentLesson.mark}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontWeight="bold">Lesson relevance:</Typography>
          <Rating value={studentLesson.relevance} disabled={true} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontWeight="bold">Lesson interest:</Typography>
          <Rating value={studentLesson.interest} disabled={true} />
        </Stack>
      </Stack>
    </>
  );
}
