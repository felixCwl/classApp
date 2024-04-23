/**
=========================================================
* sample React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  return (
    <Card>
      <SampleBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <SampleBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </SampleBox>
        <SampleBox textAlign="right" lineHeight={1.25}>
          <SampleTypography variant="button" fontWeight="light" color="text">
            {title}
          </SampleTypography>
          <SampleTypography variant="h4">{count}</SampleTypography>
        </SampleBox>
      </SampleBox>
      <Divider />
      <SampleBox pb={2} px={2}>
        <SampleTypography component="p" variant="button" color="text" display="flex">
          <SampleTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </SampleTypography>
          &nbsp;{percentage.label}
        </SampleTypography>
      </SampleBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
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
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
