// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleButton from "components/SampleButton";

function Transaction({ color, icon, name, description, value }) {
  return (
    <SampleBox key={name} component="li" py={1} pr={2} mb={1}>
      <SampleBox display="flex" justifyContent="space-between" alignItems="center">
        <SampleBox display="flex" alignItems="center">
          <SampleBox mr={2}>
            <SampleButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </SampleButton>
          </SampleBox>
          <SampleBox display="flex" flexDirection="column">
            <SampleTypography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </SampleTypography>
            <SampleTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </SampleTypography>
          </SampleBox>
        </SampleBox>
        <SampleTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </SampleTypography>
      </SampleBox>
    </SampleBox>
  );
}

// Typechecking props of the Transaction
Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Transaction;
