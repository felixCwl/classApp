// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleInput from "components/SampleInput";
import SampleButton from "components/SampleButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <SampleBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <SampleTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </SampleTypography>
          <SampleTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </SampleTypography>
        </SampleBox>
        <SampleBox pt={4} pb={3} px={3}>
          <SampleBox component="form" role="form">
            <SampleBox mb={2}>
              <SampleInput type="text" label="Name" variant="standard" fullWidth />
            </SampleBox>
            <SampleBox mb={2}>
              <SampleInput type="email" label="Email" variant="standard" fullWidth />
            </SampleBox>
            <SampleBox mb={2}>
              <SampleInput type="password" label="Password" variant="standard" fullWidth />
            </SampleBox>
            <SampleBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <SampleTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SampleTypography>
              <SampleTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </SampleTypography>
            </SampleBox>
            <SampleBox mt={4} mb={1}>
              <SampleButton variant="gradient" color="info" fullWidth>
                sign in
              </SampleButton>
            </SampleBox>
            <SampleBox mt={3} mb={1} textAlign="center">
              <SampleTypography variant="button" color="text">
                Already have an account?{" "}
                <SampleTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </SampleTypography>
              </SampleTypography>
            </SampleBox>
          </SampleBox>
        </SampleBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
