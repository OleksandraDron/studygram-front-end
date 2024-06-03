import { Container, Divider, Stack } from "@mui/material";
import {
  useGetCourseStudentAnalysisQuery,
  useGetCourseStudentGradesAnalysisQuery,
} from "../../api/analysis/CourseAnalysisQueries.js";
import AppLoader from "../common/AppLoader.jsx";
import { axisClasses, BarChart, LineChart } from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

export default function StudentCourseAnalysis({ course }) {
  const { isLoadingCourseStudentAnalysis, courseStudentAnalysis } =
    useGetCourseStudentAnalysisQuery(course?.id);
  const { isLoadingCourseStudentGradesAnalysis, courseStudentGradesAnalysis } =
    useGetCourseStudentGradesAnalysisQuery(course?.id);

  if (isLoadingCourseStudentAnalysis || isLoadingCourseStudentGradesAnalysis) {
    return <AppLoader />;
  }

  const chartSetting = {
    yAxis: [
      {
        label: "grade/%",
      },
    ],
    grid: { vertical: true, horizontal: true },
    series: [
      {
        dataKey: "avgGrade",
        label: "Grade",
        valueFormatter: (value) => `${value.toFixed(2)}`,
      },
      {
        dataKey: "avgPresence",
        label: "Presence %",
        valueFormatter: (value) => `${value.toFixed(2)}%`,
      },
    ],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <Container sx={{ width: "80%", mt: 4 }}>
      <Box my={2}>
        <Divider />
      </Box>
      <Stack my={4} textAlign="center">
        <Typography variant="h4" mb={2}>
          Course progress
        </Typography>
        <BarChart
          dataset={courseStudentAnalysis?.bars}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "title",
              tickPlacement: "end",
              tickLabelPlacement: "middle",
            },
          ]}
          {...chartSetting}
        />
      </Stack>
      <Box my={2}>
        <Divider />
      </Box>
      <Stack my={4} textAlign="center">
        <Typography variant="h6" mb={2}>
          When you received marks
        </Typography>
        <LineChart
          grid={{ vertical: true, horizontal: true }}
          xAxis={[
            {
              label: "Date",
              data: courseStudentGradesAnalysis.grades.map(
                (grade) => new Date(grade.date),
              ),
              scaleType: "time",
              valueFormatter: (date) => dayjs(date).format("YY/MM/DD"),
            },
          ]}
          series={[
            {
              curve: "stepAfter",
              label: "Grade",
              data: courseStudentGradesAnalysis.grades.map(
                (grade) => grade.grade,
              ),
            },
          ]}
          height={400}
        />
      </Stack>
    </Container>
  );
}
