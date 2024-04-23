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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <Card sx={{ boxShadow: "none" }}>
      <SampleBox p={2}>
        <SampleTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </SampleTypography>
      </SampleBox>
      <SampleBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <SampleTypography
          variant="caption"
          fontWeight="bold"
          color="text"
          textTransform="uppercase"
        >
          account
        </SampleTypography>
        <SampleBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <SampleBox mt={0.5}>
            <Switch checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
          </SampleBox>
          <SampleBox width="80%" ml={0.5}>
            <SampleTypography variant="button" fontWeight="regular" color="text">
              Email me when someone follows me
            </SampleTypography>
          </SampleBox>
        </SampleBox>
        <SampleBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <SampleBox mt={0.5}>
            <Switch checked={answersPost} onChange={() => setAnswersPost(!answersPost)} />
          </SampleBox>
          <SampleBox width="80%" ml={0.5}>
            <SampleTypography variant="button" fontWeight="regular" color="text">
              Email me when someone answers on my post
            </SampleTypography>
          </SampleBox>
        </SampleBox>
        <SampleBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <SampleBox mt={0.5}>
            <Switch checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />
          </SampleBox>
          <SampleBox width="80%" ml={0.5}>
            <SampleTypography variant="button" fontWeight="regular" color="text">
              Email me when someone mentions me
            </SampleTypography>
          </SampleBox>
        </SampleBox>
        <SampleBox mt={3}>
          <SampleTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            application
          </SampleTypography>
        </SampleBox>
        <SampleBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <SampleBox mt={0.5}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </SampleBox>
          <SampleBox width="80%" ml={0.5}>
            <SampleTypography variant="button" fontWeight="regular" color="text">
              New launches and projects
            </SampleTypography>
          </SampleBox>
        </SampleBox>
        <SampleBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <SampleBox mt={0.5}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </SampleBox>
          <SampleBox width="80%" ml={0.5}>
            <SampleTypography variant="button" fontWeight="regular" color="text">
              Monthly product updates
            </SampleTypography>
          </SampleBox>
        </SampleBox>
        <SampleBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <SampleBox mt={0.5}>
            <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
          </SampleBox>
          <SampleBox width="80%" ml={0.5}>
            <SampleTypography variant="button" fontWeight="regular" color="text">
              Subscribe to newsletter
            </SampleTypography>
          </SampleBox>
        </SampleBox>
      </SampleBox>
    </Card>
  );
}

export default PlatformSettings;
