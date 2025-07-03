import React, { useState, useMemo } from 'react';
import type { FilterConfig } from './common/FilterBar';
import FilterBar from './common/FilterBar';
import SummaryCard from './common/SummaryCard';
import ChartWrapper from './common/ChartWrapper';
import DataTable from './common/DataTable';
import KeyInsights from './common/KeyInsights';
import data from '../data/budgetVsActuals.json';
import { Box, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BusinessIcon from '@mui/icons-material/Business';
import Grid from '@mui/material/Grid';

const BudgetVsActuals: React.FC = () => {
  // Filter state
  const [department, setDepartment] = useState('All');
  const [region, setRegion] = useState('All');
  const [timePeriod, setTimePeriod] = useState(data.filters.timePeriods[0]);

  // Table filters state
  const [tableCostCenter, setTableCostCenter] = useState('All');
  const [tableVariance, setTableVariance] = useState('All');

  // Prepare filter configs for FilterBar
  const filters: FilterConfig[] = [
    {
      label: 'Department',
      value: department,
      options: data.filters.departments.map((d: string) => ({ label: d, value: d })),
      onChange: setDepartment,
    },
    {
      label: 'Region',
      value: region,
      options: data.filters.regions.map((r: string) => ({ label: r, value: r })),
      onChange: setRegion,
    },
    {
      label: 'Time Period',
      value: timePeriod,
      options: data.filters.timePeriods.map((t: string) => ({ label: t, value: t })),
      onChange: setTimePeriod,
    },
  ];

  // Unique cost center options for dropdown
  const costCenterOptions = [
    'All',
    ...Array.from(new Set(data.tableData.map((row: any) => row.costCenter.split(' ')[0])))
  ];

  // Filtered table data based on table filters
  const filteredTableData = useMemo(() => {
    let rows = data.tableData;
    if (tableCostCenter !== 'All') {
      rows = rows.filter((row: any) => row.costCenter.startsWith(tableCostCenter));
    }
    if (tableVariance === 'Over Budget') {
      rows = rows.filter((row: any) => row.variance < 0);
    } else if (tableVariance === 'Under Budget') {
      rows = rows.filter((row: any) => row.variance > 0);
    }
    return rows;
  }, [data.tableData, tableCostCenter, tableVariance]);

  // Chart data (for demo, not filtered)
  const chartData = data.chartData;

  // Summary cards
  const summaryCards = [
    {
      title: 'Under Budget',
      value: `$${data.summary.underBudget.toLocaleString()}`,
      icon: <SavingsIcon color="success" />,
      color: '#E6F4EA',
    },
    {
      title: 'Over Budget',
      value: `$${data.summary.overBudget.toLocaleString()}`,
      icon: <TrendingDownIcon color="warning" />,
      color: '#FFF3E0',
    },
    {
      title: 'Total Cost Centers',
      value: data.summary.totalCostCenters,
      icon: <BusinessIcon color="primary" />,
      color: '#F6F8F3',
    },
  ];

  // Fix insight type for KeyInsights
  const insights = data.insights.map((insight: any) => ({
    ...insight,
    type: insight.type as 'success' | 'warning' | 'info' | 'error',
  }));

  return (
    <Box maxWidth={1400} mx="auto" px={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Budget vs Actuals
      </Typography>
      {/* Filters and summary cards in a single row */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid xs={12} md={4}>
          <FilterBar filters={filters} />
        </Grid>
        {summaryCards.map((card) => (
          <Grid xs={12} sm={4} md={2} key={card.title}>
            <SummaryCard {...card} />
          </Grid>
        ))}
      </Grid>
      {/* Two-column layout for Key Insights and Chart, responsive */}
      <Grid container spacing={2} mb={3} alignItems="stretch">
        <Grid xs={12} md={4}>
          <Box height="100%" display="flex" flexDirection="column">
            <Typography variant="h6" mb={1}>Key Insights</Typography>
            <KeyInsights insights={insights} />
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Box height="100%" minHeight={420}>
            <ChartWrapper type="bar" data={chartData} options={{ maintainAspectRatio: false, aspectRatio: 2.5, layout: { padding: 24 } }} />
          </Box>
        </Grid>
      </Grid>
      <Typography variant="h6" mt={4} mb={1}>
        Details by Cost Center
      </Typography>
      {/* Table filters */}
      <Box display="flex" gap={2} mb={1}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Cost Center</InputLabel>
          <Select
            value={tableCostCenter}
            label="Cost Center"
            onChange={e => setTableCostCenter(e.target.value)}
          >
            {costCenterOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Variance</InputLabel>
          <Select
            value={tableVariance}
            label="Variance"
            onChange={e => setTableVariance(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Over Budget">Over Budget</MenuItem>
            <MenuItem value="Under Budget">Under Budget</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <DataTable columns={data.tableColumns} rows={filteredTableData} />
    </Box>
  );
};

export default BudgetVsActuals; 