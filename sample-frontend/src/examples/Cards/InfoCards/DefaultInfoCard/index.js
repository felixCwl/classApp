// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

function DefaultInfoCard({ color, icon, title, description, value }) {
  return (
    <Card>
      <SampleBox p={2} mx={3} display="flex" justifyContent="center">
        <SampleBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </SampleBox>
      </SampleBox>
      <SampleBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <SampleTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SampleTypography>
        {description && (
          <SampleTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </SampleTypography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <SampleTypography variant="h5" fontWeight="medium">
            {value}
          </SampleTypography>
        )}
      </SampleBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
DefaultInfoCard.defaultProps = {
  color: "info",
  value: "",
  description: "",
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DefaultInfoCard;
