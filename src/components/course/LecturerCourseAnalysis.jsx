import { Container, Divider, Stack } from "@mui/material";
import {
  useGetCourseAnalysisQuery,
  useGetCourseAvgAnalysisQuery,
  useGetCourseBarsAnalysisQuery,
  useGetCourseGradesAnalysisQuery,
} from "../../api/analysis/CourseAnalysisQueries.js";
import AppLoader from "../common/AppLoader.jsx";
import {
  axisClasses,
  BarChart,
  ChartsGrid,
  ChartsXAxis,
  ChartsYAxis,
  Gauge,
  gaugeClasses,
  LineChart,
  LinePlot,
  MarkPlot,
  ResponsiveChartContainer,
  ScatterPlot,
} from "@mui/x-charts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LecturerCourseAnalysis({ course }) {
  const { isLoadingCourseAnalysis, courseAnalysis } = useGetCourseAnalysisQuery(
    course?.id,
  );
  const { isLoadingCourseAvgAnalysis, courseAvgAnalysis } =
    useGetCourseAvgAnalysisQuery(course?.id);
  const { isLoadingCourseGradesAnalysis, courseGradesAnalysis } =
    useGetCourseGradesAnalysisQuery(course?.id);
  const { isLoadingCourseBarsAnalysis, courseBarsAnalysis } =
    useGetCourseBarsAnalysisQuery(course?.id);

  const analysisEmpty =
    courseAnalysis?.progress && courseAnalysis?.progress?.length === 0;

  if (
    isLoadingCourseAnalysis ||
    isLoadingCourseAvgAnalysis ||
    isLoadingCourseGradesAnalysis ||
    isLoadingCourseBarsAnalysis
  ) {
    return <AppLoader />;
  }

  if (analysisEmpty || courseAnalysis.correlation === "NaN") {
    return (
      <Stack my={4} textAlign="center">
        <Typography variant="h5">Analysis is not ready</Typography>
      </Stack>
    );
  }

  const valueFormatter = (value) => `${value.toFixed(2)}%`;

  const chartSetting = {
    yAxis: [
      {
        label: "%",
      },
    ],
    series: [
      { dataKey: "avgInterest", label: "Interest %", valueFormatter },
      { dataKey: "avgPresence", label: "Presence %", valueFormatter },
      { dataKey: "avgRelevance", label: "Relevance %", valueFormatter },
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
      <Stack justifyContent="center" textAlign="center">
        <Typography variant="h5">
          Graph of dependence of student grade on attendance
        </Typography>
        <Typography variant="h7" my={2}>
          Correlation coefficient:{" "}
          <span className="text-sky-500 font-bold">
            {courseAnalysis?.correlation?.toFixed(2)}
          </span>
        </Typography>
        <ResponsiveChartContainer
          xAxis={[
            {
              label: "Attendance %",
              data: courseAnalysis.linearRegressionX,
            },
          ]}
          series={[
            {
              type: "scatter",
              data: courseAnalysis.progress.map((progress) => ({
                id: progress.studentId,
                x: progress.presence,
                y: progress.grade,
              })),
              markerSize: 5,
            },
            {
              type: "line",
              data: courseAnalysis.linearRegressionY,
              showMark: false,
            },
          ]}
          height={350}
          margin={{ top: 10 }}
        >
          <ChartsGrid vertical horizontal />
          <ScatterPlot />
          <LinePlot />
          <ChartsXAxis label="Attendance %" />
          <ChartsYAxis label="Grade" />
          <MarkPlot />
        </ResponsiveChartContainer>
      </Stack>
      <Box my={2}>
        <Divider />
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        textAlign="center"
        spacing={4}
        width="100%"
      >
        <Stack width="33%">
          <Typography>Avg student presence on lessons</Typography>
          <Gauge
            value={courseAvgAnalysis?.avgPresence.toFixed()}
            valueMax={100}
            valueMin={0}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax}%`}
          />
        </Stack>
        <Stack width="33%">
          <Typography>Avg student grade</Typography>
          <Gauge
            value={courseAvgAnalysis?.avgGrade.toFixed()}
            valueMax={100}
            valueMin={0}
            startAngle={-110}
            endAngle={110}
            height={200}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#09aba5",
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </Stack>
        <Stack width="33%">
          <Typography>Avg lessons interest and relevance</Typography>
          <Gauge
            value={courseAvgAnalysis?.avgInterestAndRelevance.toFixed()}
            valueMax={100}
            valueMin={0}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax}%`}
          />
        </Stack>
      </Stack>
      <Box my={2}>
        <Divider />
      </Box>
      <Stack my={4} textAlign="center">
        <Typography variant="h6" mb={2}>
          Distribution of student grades
        </Typography>
        <LineChart
          grid={{ vertical: true, horizontal: true }}
          xAxis={[
            {
              label: "Grade",
              valueFormatter: (value) => value + " grade",
              data: courseGradesAnalysis.grades.map((grade) => grade.grade),
            },
          ]}
          series={[
            {
              curve: "natural",
              label: "Number of students",
              data: courseGradesAnalysis.grades.map(
                (grade) => grade.numberOfStudents,
              ),
            },
          ]}
          height={400}
        />
      </Stack>
      <Box my={2}>
        <Divider />
      </Box>
      <Stack my={4} textAlign="center">
        <Typography variant="h6" mb={2}>
          Students presence and interest through the course
        </Typography>
        <BarChart
          dataset={courseBarsAnalysis?.bars}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
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
    </Container>
  );
}
