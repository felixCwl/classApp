import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// RadarChart configurations
import configs from "examples/Charts/RadarChart/configs";

// sample React base styles
import colors from "assets/theme/base/colors";

// sample React helper functions
import rgba from "assets/theme/functions/rgba";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function RadarChart({ icon, title, description, height, chart }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: colors[dataset.color]
          ? rgba(colors[dataset.color || "dark"].main, 0.2)
          : rgba(colors.dark.main, 0.2),
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <SampleBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <SampleBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <SampleBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "dark"}
              variant="gradient"
              coloredShadow={icon.color || "dark"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </SampleBox>
          )}
          <SampleBox mt={icon.component ? -2 : 0}>
            {title && <SampleTypography variant="h6">{title}</SampleTypography>}
            <SampleBox mb={2}>
              <SampleTypography component="div" variant="button" color="text">
                {description}
              </SampleTypography>
            </SampleBox>
          </SampleBox>
        </SampleBox>
      ) : null}
      {useMemo(
        () => (
          <SampleBox p={6} height={height}>
            <Radar data={data} options={options} redraw />
          </SampleBox>
        ),
        [chart]
      )}
    </SampleBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of RadarChart
RadarChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
};

// Typechecking props for the RadarChart
RadarChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default RadarChart;
