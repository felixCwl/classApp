import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <SampleBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <SampleTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </SampleTypography>
      <SampleTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </SampleTypography>
    </SampleBox>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default NotificationItem;
