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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// sample React components
import SampleTypography from "components/SampleTypography";

// Custom styles for SampleProgress
import SampleProgressRoot from "components/SampleProgress/SampleProgressRoot";

const SampleProgress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <SampleTypography variant="button" fontWeight="medium" color="text">
        {value}%
      </SampleTypography>
    )}
    <SampleProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

// Setting default values for the props of SampleProgress
SampleProgress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

// Typechecking props for the SampleProgress
SampleProgress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
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
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default SampleProgress;
