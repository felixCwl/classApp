import { useEffect } from "react";

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
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";
import reportsLineChartData from "layouts/rtl/data/reportsLineChartData";

// RTL components
import Projects from "layouts/rtl/components/Projects";
import OrdersOverview from "layouts/rtl/components/OrdersOverview";

// sample React contexts
import { useMaterialUIController, setDirection } from "context";

function RTL() {
  const [, dispatch] = useMaterialUIController();
  const { sales, tasks } = reportsLineChartData;

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

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
                title="أموال اليوم"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "من الأسبوع الماضي",
                }}
              />
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="مستخدمو اليوم"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "من الأسبوع الماضي",
                }}
              />
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="عملاء جدد"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "من الشهر الماضي",
                }}
              />
            </SampleBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SampleBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="مبيعات"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "مقارنة بيوم أمس",
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
                  title="مشاهدات الموقع"
                  description="آخر أداء للحملة"
                  date="الحملة أرسلت قبل يومين"
                  chart={reportsBarChartData}
                />
              </SampleBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SampleBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="المبيعات اليومية"
                  description={
                    <>
                      (<strong>+15%</strong>) زيادة في مبيعات اليوم..
                    </>
                  }
                  date="تم التحديث منذ 4 دقائق"
                  chart={sales}
                />
              </SampleBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SampleBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="المهام المكتملة"
                  description="آخر أداء للحملة"
                  date="تم تحديثه للتو"
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

export default RTL;
