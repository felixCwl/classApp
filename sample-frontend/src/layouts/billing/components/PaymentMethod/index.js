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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleButton from "components/SampleButton";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// sample React context
import { useMaterialUIController } from "context";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card id="delete-account">
      <SampleBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SampleTypography variant="h6" fontWeight="medium">
          Payment Method
        </SampleTypography>
        <SampleButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new card
        </SampleButton>
      </SampleBox>
      <SampleBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SampleBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <SampleBox
                component="img"
                src={masterCardLogo}
                alt="master card"
                width="10%"
                mr={2}
              />
              <SampleTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
              </SampleTypography>
              <SampleBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </SampleBox>
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <SampleBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <SampleBox component="img" src={visaLogo} alt="master card" width="10%" mr={2} />
              <SampleTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;5248
              </SampleTypography>
              <SampleBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small">
                    edit
                  </Icon>
                </Tooltip>
              </SampleBox>
            </SampleBox>
          </Grid>
        </Grid>
      </SampleBox>
    </Card>
  );
}

export default PaymentMethod;
