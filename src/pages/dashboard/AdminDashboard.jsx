import { Grid, Typography } from "@mui/material";
import AnalyticAdmin from "components/cards/statistics/AnalyticAdmin";
import AdminTaskTable from "../../components/Dashboard/AdminTaskTable";
import ManagerTable from "components/Dashboard/ManagerTable";
import MainCard from 'components/MainCard';
import UniqueVisitorCard from "components/Dashboard/UniqueVisitorCard";
import SalesChart from "components/Dashboard/SalesChart";


export default function AdminDashboard() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ pl: 2, mt: 1 }}> {/* Adjust left spacing */}
    {/* Admin Dashboard Containers */}
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticAdmin title="Completed Tasks" count="0" extra="✅ All deadlines met" />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticAdmin title="Total Tasks" count="0" extra="📌 5 tasks need review" />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticAdmin title="Team Members" count="0" extra="👥 3 members active now" />
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticAdmin title="Pending Tasks" count="0" extra="⚠️ 2 tasks overdue" />
    </Grid>

    {/* Row-2 */}
    <Grid item xs={12} md={7} lg={8}>
      <UniqueVisitorCard />
    </Grid>
    <Grid item xs={12} md={5} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Project Report</Typography>
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <SalesChart />
      </MainCard>
    </Grid>
    

    {/* Row-3 */}
    <Grid item xs={12} md={5} lg={4}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          
        </Grid>
      </Grid>
      <MainCard sx={{ mt: 2 }} content={false}>
        <ManagerTable />
      </MainCard>
    </Grid>
    <Grid item xs={12} md={7} lg={8}>
      <AdminTaskTable />
    </Grid>
  
  </Grid>
  );
}
