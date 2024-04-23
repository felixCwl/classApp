/**
=========================================================
* sample  React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleProgress from "components/SampleProgress";

// ProgressLineChart configurations
import configs from "examples/Charts/LineCharts/ProgressLineChart/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ProgressLineChart({ color, icon, title, count, progress, height, chart }) {
  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <SampleBox display="flex" alignItems="center" pt={2} px={2}>
        <SampleBox
          width="3rem"
          height="3rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </SampleBox>
        <SampleBox ml={2} lineHeight={1}>
          <SampleTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color="text"
          >
            {title}
          </SampleTypography>
          {count ? (
            <SampleTypography variant="h5" fontWeight="bold">
              {count}
            </SampleTypography>
          ) : null}
        </SampleBox>
        <SampleBox width="25%" ml="auto">
          <SampleTypography display="block" variant="caption" fontWeight="medium" color="text">
            {progress}%
          </SampleTypography>
          <SampleBox mt={0.25}>
            <SampleProgress variant="gradient" color={color} value={progress} />
          </SampleBox>
        </SampleBox>
      </SampleBox>
      {useMemo(
        () => (
          <SampleBox mt={2}>
            <Line data={data} options={options} style={{ height }} redraw />
          </SampleBox>
        ),
        [chart, height, color]
      )}
    </Card>
  );
}

// Setting default values for the props of ProgressLineChart
ProgressLineChart.defaultProps = {
  color: "info",
  count: 0,
  height: "6.25rem",
};

// Typechecking props for the ProgressLineChart
ProgressLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  progress: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default ProgressLineChart;
