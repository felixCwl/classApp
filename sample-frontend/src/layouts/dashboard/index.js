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
import Grid from "@mui/material/Grid";

// sample React components
import SampleBox from "components/SampleBox";

// sample React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SampleBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </SampleBox>
          </Grid>
        </Grid>
        <SampleBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <SampleBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </SampleBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SampleBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </SampleBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SampleBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </SampleBox>
            </Grid>
          </Grid>
        </SampleBox>
        <SampleBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </SampleBox>
      </SampleBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
