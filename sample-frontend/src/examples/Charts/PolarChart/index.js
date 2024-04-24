import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { PolarArea } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// PolarChart configurations
import configs from "examples/Charts/PolarChart/configs";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PolarChart({ icon, title, description, chart, height }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

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
          <SampleBox p={4} height={height}>
            <PolarArea data={data} options={options} redraw />
          </SampleBox>
        ),
        [chart]
      )}
    </SampleBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of PolarChart
PolarChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
};

// Typechecking props for the PolarChart
PolarChart.propTypes = {
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
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default PolarChart;
