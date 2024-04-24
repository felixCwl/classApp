import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleInput from "components/SampleInput";
import SampleButton from "components/SampleButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <SampleBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <SampleTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </SampleTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <SampleTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </SampleTypography>
            </Grid>
            <Grid item xs={2}>
              <SampleTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </SampleTypography>
            </Grid>
            <Grid item xs={2}>
              <SampleTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </SampleTypography>
            </Grid>
          </Grid>
        </SampleBox>
        <SampleBox pt={4} pb={3} px={3}>
          <SampleBox component="form" role="form">
            <SampleBox mb={2}>
              <SampleInput type="email" label="Email" fullWidth />
            </SampleBox>
            <SampleBox mb={2}>
              <SampleInput type="password" label="Password" fullWidth />
            </SampleBox>
            <SampleBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SampleTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </SampleTypography>
            </SampleBox>
            <SampleBox mt={4} mb={1}>
              <SampleButton variant="gradient" color="info" fullWidth>
                sign in
              </SampleButton>
            </SampleBox>
            <SampleBox mt={3} mb={1} textAlign="center">
              <SampleTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <SampleTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </SampleTypography>
              </SampleTypography>
            </SampleBox>
          </SampleBox>
        </SampleBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
