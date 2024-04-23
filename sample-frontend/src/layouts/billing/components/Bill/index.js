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
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleButton from "components/SampleButton";

// sample React context
import { useMaterialUIController } from "context";

function Bill({ name, company, email, vat, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <SampleBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SampleBox width="100%" display="flex" flexDirection="column">
        <SampleBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SampleTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </SampleTypography>

          <SampleBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SampleBox mr={1}>
              <SampleButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SampleButton>
            </SampleBox>
            <SampleButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </SampleButton>
          </SampleBox>
        </SampleBox>
        <SampleBox mb={1} lineHeight={0}>
          <SampleTypography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <SampleTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {company}
            </SampleTypography>
          </SampleTypography>
        </SampleBox>
        <SampleBox mb={1} lineHeight={0}>
          <SampleTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <SampleTypography variant="caption" fontWeight="medium">
              {email}
            </SampleTypography>
          </SampleTypography>
        </SampleBox>
        <SampleTypography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <SampleTypography variant="caption" fontWeight="medium">
            {vat}
          </SampleTypography>
        </SampleTypography>
      </SampleBox>
    </SampleBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
