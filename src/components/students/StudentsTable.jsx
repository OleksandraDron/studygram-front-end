import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authUserSelector } from "../../store/selectors.js";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { useGetCourseStudentsQuery } from "../../api/course/CourseQueries.js";
import { useMutation } from "@tanstack/react-query";
import CourseApi from "../../api/course/CourseApi.js";
import { toast } from "react-toastify";
import { queryClient } from "../../config/app-config.js";
import AppLoader from "../common/AppLoader.jsx";
import AppModal from "../common/AppModal.jsx";

export default function StudentsTable({ course }) {
  const authUser = useSelector(authUserSelector);
  const navigate = useNavigate();
  const [deleteStudentDialog, setDeleteStudentDialog] = useState({
    open: false,
    studentId: null,
  });

  const { isLoadingStudents, courseStudents, courseStudentsQueryKey } =
    useGetCourseStudentsQuery(course.id);

  const deleteStudent = useMutation({
    mutationFn: CourseApi.deleteStudentFromCourse,
    onSuccess: () => {
      toast.success("Student deleted successfully");
      setDeleteStudentDialog({ open: false });
      queryClient.invalidateQueries(courseStudentsQueryKey);
    },
  });

  if (isLoadingStudents) {
    return <AppLoader />;
  }

  const columns = [
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "finalMark", headerName: "Current mark", width: 100 },
    { field: "phone", headerName: "Phone number", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "flow",
      headerName: "Flow",
      width: 75,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      disableClickEventBubbling: true,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<Delete />}
          onClick={() => {
            setDeleteStudentDialog({
              open: true,
              studentId: params.id,
            });
          }}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <>
      <AppModal
        isOpen={deleteStudentDialog.open}
        onClose={() => setDeleteStudentDialog({ open: false })}
        message="Are you sure you want to delete this student from the course?"
        onSubmit={() => {
          deleteStudent.mutate({
            studentId: deleteStudentDialog.studentId,
            courseId: course.id,
          });
        }}
      />
      <Box mt={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Course students</Typography>
          {authUser?.role === "ROLE_LECTOR" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() =>
                navigate(`/courses/students`, { state: { course } })
              }
            >
              Add students
            </Button>
          )}
        </Stack>
        <Box style={{ height: "600px", width: "100%" }} mt={2}>
          <DataGrid
            className="bg-white"
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            getRowId={(row) => row.id}
            rows={courseStudents.map((courseStudent) => ({
              ...courseStudent.student,
              flow: courseStudent.student.studentFlow.flowCode,
              finalMark: courseStudent.finalMark,
              courseId: courseStudent.subjectCourseId,
            }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 30 },
              },
            }}
            pageSizeOptions={[10, 30, 50, 100]}
            checkboxSelection
          />
        </Box>
      </Box>
    </>
  );
}
