import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleAlert from "components/SampleAlert";
import SampleButton from "components/SampleButton";
import SampleSnackbar from "components/SampleSnackbar";

// sample React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <SampleTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <SampleTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </SampleTypography>
      . Give it a click if you like.
    </SampleTypography>
  );

  const renderSuccessSB = (
    <SampleSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <SampleSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <SampleSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <SampleSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SampleBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <SampleBox p={2}>
                <SampleTypography variant="h5">Alerts</SampleTypography>
              </SampleBox>
              <SampleBox pt={2} px={2}>
                <SampleAlert color="primary" dismissible>
                  {alertContent("primary")}
                </SampleAlert>
                <SampleAlert color="secondary" dismissible>
                  {alertContent("secondary")}
                </SampleAlert>
                <SampleAlert color="success" dismissible>
                  {alertContent("success")}
                </SampleAlert>
                <SampleAlert color="error" dismissible>
                  {alertContent("error")}
                </SampleAlert>
                <SampleAlert color="warning" dismissible>
                  {alertContent("warning")}
                </SampleAlert>
                <SampleAlert color="info" dismissible>
                  {alertContent("info")}
                </SampleAlert>
                <SampleAlert color="light" dismissible>
                  {alertContent("light")}
                </SampleAlert>
                <SampleAlert color="dark" dismissible>
                  {alertContent("dark")}
                </SampleAlert>
              </SampleBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <SampleBox p={2} lineHeight={0}>
                <SampleTypography variant="h5">Notifications</SampleTypography>
                <SampleTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </SampleTypography>
              </SampleBox>
              <SampleBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SampleButton
                      variant="gradient"
                      color="success"
                      onClick={openSuccessSB}
                      fullWidth
                    >
                      success notification
                    </SampleButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SampleButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </SampleButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SampleButton
                      variant="gradient"
                      color="warning"
                      onClick={openWarningSB}
                      fullWidth
                    >
                      warning notification
                    </SampleButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <SampleButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </SampleButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </SampleBox>
            </Card>
          </Grid>
        </Grid>
      </SampleBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
