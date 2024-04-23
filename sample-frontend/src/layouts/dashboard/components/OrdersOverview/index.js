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
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// sample React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <SampleBox pt={3} px={3}>
        <SampleTypography variant="h6" fontWeight="medium">
          Orders overview
        </SampleTypography>
        <SampleBox mt={0} mb={2}>
          <SampleTypography variant="button" color="text" fontWeight="regular">
            <SampleTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </SampleTypography>
            &nbsp;
            <SampleTypography variant="button" color="text" fontWeight="medium">
              24%
            </SampleTypography>{" "}
            this month
          </SampleTypography>
        </SampleBox>
      </SampleBox>
      <SampleBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, Design changes"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </SampleBox>
    </Card>
  );
}

export default OrdersOverview;
