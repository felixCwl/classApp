import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SampleButton
import SampleButtonRoot from "components/SampleButton/SampleButtonRoot";

// sample React contexts
import { useMaterialUIController } from "context";

const SampleButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
      <SampleButtonRoot
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode }}
      >
        {children}
      </SampleButtonRoot>
    );
  }
);

// Setting default values for the props of SampleButton
SampleButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the SampleButton
SampleButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default SampleButton;
