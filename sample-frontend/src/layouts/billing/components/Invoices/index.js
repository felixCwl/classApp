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

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleButton from "components/SampleButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card sx={{ height: "100%" }}>
      <SampleBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SampleTypography variant="h6" fontWeight="medium">
          Invoices
        </SampleTypography>
        <SampleButton variant="outlined" color="info" size="small">
          view all
        </SampleButton>
      </SampleBox>
      <SampleBox p={2}>
        <SampleBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter />
        </SampleBox>
      </SampleBox>
    </Card>
  );
}

export default Invoices;
