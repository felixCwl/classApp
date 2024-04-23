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
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// Custom styles for the SampleSnackbar
import SampleSnackbarIconRoot from "components/SampleSnackbar/SampleSnackbarIconRoot";

// sample React context
import { useMaterialUIController } from "context";

function SampleSnackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = darkMode ? "inherit" : "dark";
    dateTimeColor = darkMode ? "inherit" : "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <SampleBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({ palette }) =>
            darkMode ? palette.background.card : palette[color] || palette.white.main,
        }}
      >
        <SampleBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <SampleBox display="flex" alignItems="center" lineHeight={0}>
            <SampleSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </SampleSnackbarIconRoot>
            <SampleTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </SampleTypography>
          </SampleBox>
          <SampleBox display="flex" alignItems="center" lineHeight={0}>
            <SampleTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </SampleTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  (bgWhite && !darkMode) || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              close
            </Icon>
          </SampleBox>
        </SampleBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <SampleBox
          p={1.5}
          sx={{
            fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette: { white, text } }) => {
              let colorValue = bgWhite || color === "light" ? text.main : white.main;

              if (darkMode) {
                colorValue = color === "light" ? "inherit" : white.main;
              }

              return colorValue;
            },
          }}
        >
          {content}
        </SampleBox>
      </SampleBox>
    </Snackbar>
  );
}

// Setting default values for the props of SampleSnackbar
SampleSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for SampleSnackbar
SampleSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default SampleSnackbar;
