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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleAvatar from "components/SampleAvatar";
import SampleButton from "components/SampleButton";

function ProfilesList({ title, profiles, shadow }) {
  const renderProfiles = profiles.map(({ image, name, description, action }) => (
    <SampleBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <SampleBox mr={2}>
        <SampleAvatar src={image} alt="something here" shadow="md" />
      </SampleBox>
      <SampleBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <SampleTypography variant="button" fontWeight="medium">
          {name}
        </SampleTypography>
        <SampleTypography variant="caption" color="text">
          {description}
        </SampleTypography>
      </SampleBox>
      <SampleBox ml="auto">
        {action.type === "internal" ? (
          <SampleButton component={Link} to={action.route} variant="text" color="info">
            {action.label}
          </SampleButton>
        ) : (
          <SampleButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="text"
            color={action.color}
          >
            {action.label}
          </SampleButton>
        )}
      </SampleBox>
    </SampleBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <SampleBox pt={2} px={2}>
        <SampleTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SampleTypography>
      </SampleBox>
      <SampleBox p={2}>
        <SampleBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </SampleBox>
      </SampleBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
