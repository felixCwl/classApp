// @mui material components
import Card from "@mui/material/Card";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleInput from "components/SampleInput";
import SampleButton from "components/SampleButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <SampleBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <SampleTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </SampleTypography>
          <SampleTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </SampleTypography>
        </SampleBox>
        <SampleBox pt={4} pb={3} px={3}>
          <SampleBox component="form" role="form">
            <SampleBox mb={4}>
              <SampleInput type="email" label="Email" variant="standard" fullWidth />
            </SampleBox>
            <SampleBox mt={6} mb={1}>
              <SampleButton variant="gradient" color="info" fullWidth>
                reset
              </SampleButton>
            </SampleBox>
          </SampleBox>
        </SampleBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
