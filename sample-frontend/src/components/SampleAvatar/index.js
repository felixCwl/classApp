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

// Custom styles for SampleAvatar
import SampleAvatarRoot from "components/SampleAvatar/SampleAvatarRoot";

const SampleAvatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <SampleAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Setting default values for the props of SampleAvatar
SampleAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

// Typechecking props for the SampleAvatar
SampleAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default SampleAvatar;
