import AppModal from "../common/AppModal.jsx";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import CourseApi from "../../api/course/CourseApi.js";
import { toast } from "react-toastify";

export default function StudentLessonDialog({ open, onClose, onSubmit, data }) {
  const { control, handleSubmit } = useForm();

  const updateStudentLesson = useMutation({
    mutationFn: CourseApi.patchLessonStudent,
    onSuccess: () => {
      toast.success("Updated successfully");
      onSubmit();
    },
  });

  const handleFormSubmitInDialog = (formData) => {
    updateStudentLesson.mutate({
      studentId: data.lessonData.student.id,
      lessonId: data.lessonId,
      updateDto: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmitInDialog)}>
      <AppModal
        isOpen={open}
        onClose={onClose}
        message={`Update ${data.lessonData.student.firstname} ${data.lessonData.student.lastname} lesson`}
        onSubmit={handleSubmit(handleFormSubmitInDialog)}
      >
        <Stack spacing={2} gap={1} minWidth={500}>
          <Typography>Presence state*</Typography>
          <Controller
            rules={{ required: true }}
            control={control}
            defaultValue={data.lessonData.presentState}
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
            name="mark"
            control={control}
            defaultValue={data.lessonData.mark}
            rules={{
              required: "Mark is required",
              min: {
                value: 0,
                message: "Min value is 0",
              },
              max: {
                value: 100,
                message: "Max value is 100",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                margin="dense"
                fullWidth={true}
                label="Mark for the lesson*"
                type="number"
                variant="outlined"
                error={!!error}
                onChange={onChange}
                helperText={error?.message ?? null}
              />
            )}
          />
        </Stack>
      </AppModal>
    </form>
  );
}
