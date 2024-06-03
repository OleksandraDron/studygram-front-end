import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { useGetLessonStudentsQuery } from "../../api/course/CourseQueries.js";
import AppLoader from "../common/AppLoader.jsx";
import dayjs from "dayjs";
import { queryClient } from "../../config/app-config.js";
import StudentLessonDialog from "./StudentLessonDialog.jsx";

export default function LessonStudentsTable({ lessonId }) {
  const [updateStudentDialog, setUpdateStudentDialog] = useState({
    open: false,
    lessonData: null,
  });

  const { lessonStudents, isLoadingLessonStudents, lessonStudentsQueryKey } =
    useGetLessonStudentsQuery(lessonId);

  if (isLoadingLessonStudents) {
    return <AppLoader />;
  }

  const columns = [
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "flow",
      headerName: "Flow",
      width: 75,
    },
    // { field: "phone", headerName: "Phone number", width: 200 },
    // { field: "email", headerName: "Email", width: 250 },
    {
      field: "updatedDate",
      headerName: "Last updated date",
      width: 200,
    },
    { field: "mark", headerName: "Lesson mark", width: 100 },
    { field: "presentState", headerName: "Presence", width: 100 },
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
          icon={<Edit />}
          onClick={() => {
            console.log(params.row);
            setUpdateStudentDialog({
              open: true,
              lessonData: { ...params.row },
            });
          }}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <>
      {updateStudentDialog.open && (
        <StudentLessonDialog
          open={updateStudentDialog.open}
          onClose={() => setUpdateStudentDialog({ open: false })}
          onSubmit={() => {
            setUpdateStudentDialog({ open: false });
            queryClient.invalidateQueries(lessonStudentsQueryKey);
          }}
          data={{ lessonData: updateStudentDialog.lessonData, lessonId }}
        />
      )}
      <Box mt={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Students</Typography>
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
            rows={lessonStudents.map((lessonStudent) => ({
              ...lessonStudent,
              ...lessonStudent.student,
              updatedDate: lessonStudent.updatedPresentDate
                ? dayjs(lessonStudent.updatedPresentDate).format("MMM D, HH:mm")
                : "-",
              flow: lessonStudent.student.studentFlow.flowCode,
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
