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

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// sample React components
import SampleBox from "components/SampleBox";

// Custom styles for the SampleAlert
import SampleAlertRoot from "components/SampleAlert/SampleAlertRoot";
import SampleAlertCloseIcon from "components/SampleAlert/SampleAlertCloseIcon";

function SampleAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <SampleAlertRoot ownerState={{ color }} {...rest}>
        <SampleBox display="flex" alignItems="center" color="white">
          {children}
        </SampleBox>
        {dismissible ? (
          <SampleAlertCloseIcon onClick={mount ? handleAlertStatus : null}>
            &times;
          </SampleAlertCloseIcon>
        ) : null}
      </SampleAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of SampleAlert
SampleAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the SampleAlert
SampleAlert.propTypes = {
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
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SampleAlert;
