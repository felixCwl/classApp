// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// Timeline context
import { useTimeline } from "examples/Timeline/context";

// Custom styles for the TimelineItem
import timelineItem from "examples/Timeline/TimelineItem/styles";

function TimelineItem({ color, icon, title, dateTime, description, lastItem }) {
  const isDark = useTimeline();

  return (
    <SampleBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      <SampleBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </SampleBox>
      <SampleBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <SampleTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </SampleTypography>
        <SampleBox mt={0.5}>
          <SampleTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime}
          </SampleTypography>
        </SampleBox>
        <SampleBox mt={2} mb={1.5}>
          {description ? (
            <SampleTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </SampleTypography>
          ) : null}
        </SampleBox>
      </SampleBox>
    </SampleBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
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
  description: PropTypes.string,
  lastItem: PropTypes.bool,
};

export default TimelineItem;
