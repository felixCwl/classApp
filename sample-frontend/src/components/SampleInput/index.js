import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SampleInput
import SampleInputRoot from "components/SampleInput/SampleInputRoot";

const SampleInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <SampleInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of SampleInput
SampleInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the SampleInput
SampleInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default SampleInput;
