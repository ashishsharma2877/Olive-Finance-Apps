import React, { useState, useMemo } from 'react';
import type { FilterConfig } from './common/FilterBar';
import FilterBar from './common/FilterBar';
import SummaryCard from './common/SummaryCard';
import PlayerChartWrapper from './common/PlayerChartWrapper';
import DataTable from './common/DataTable';
import KeyInsights from './common/KeyInsights';
import data from '../data/playerEngagement.json';
import { Box, Typography, MenuItem, FormControl, InputLabel, Select, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

const PlayerEngagement: React.FC = () => {
  const [game, setGame] = useState('All');
  const [platform, setPlatform] = useState('All');
  const [country, setCountry] = useState('All');
  const [timePeriod, setTimePeriod] = useState(data.filters.timePeriods[0]);

  const filters: FilterConfig[] = [
    {
      label: 'Game',
      value: game,
      options: data.filters.games.map((g: string) => ({ label: g, value: g })),
      onChange: setGame,
    },
    {
      label: 'Platform',
      value: platform,
      options: data.filters.platforms.map((p: string) => ({ label: p, value: p })),
      onChange: setPlatform,
    },
    {
      label: 'Country',
      value: country,
      options: data.filters.countries.map((c: string) => ({ label: c, value: c })),
      onChange: setCountry,
    },
    {
      label: 'Time Period',
      value: timePeriod,
      options: data.filters.timePeriods.map((t: string) => ({ label: t, value: t })),
      onChange: setTimePeriod,
    },
  ];

  const filteredChartData = useMemo(() => {
    return data.chartData.filter(row =>
      (game === 'All' || row.game === game) &&
      (platform === 'All' || row.platform === platform) &&
      (country === 'All' || row.country === country) &&
      (timePeriod === 'All' || row.timePeriod === timePeriod)
    );
  }, [data.chartData, game, platform, country, timePeriod]);

  const summaryCards = [
    {
      title: 'Total DAU',
      value: data.summary.dau.toLocaleString(),
      icon: <PersonIcon color="primary" />,
      color: '#E3F2FD',
    },
    {
      title: 'Avg Session Length',
      value: data.summary.avgSessionLength,
      icon: <AccessTimeIcon color="secondary" />,
      color: '#F3E5F5',
    },
    {
      title: 'Rage Quits',
      value: data.summary.rageQuits.toLocaleString(),
      icon: <WarningIcon color="error" />,
      color: '#FFEBEE',
    },
  ];

  const insights = data.insights.map((insight: any) => ({
    ...insight,
    type: insight.type as 'success' | 'warning' | 'info' | 'error',
  }));

  const [exitReasonFilter, setExitReasonFilter] = useState('All');

  const filteredTableData = useMemo(() => {
    return data.tableData.filter(row =>
      (game === 'All' || row.game === game) &&
      (platform === 'All' || row.platform === platform) &&
      (country === 'All' || row.country === country) &&
      (timePeriod === 'All' || row.date?.includes('2025-07')) &&
      (exitReasonFilter === 'All' || row.exitReason === exitReasonFilter)
    );
  }, [data.tableData, game, platform, country, timePeriod, exitReasonFilter]);

  const customRenderers: { [field: string]: (value: any, row: any) => React.ReactNode } = {
    platform: (value) => value === 'iOS' ? <Chip icon={<AppleIcon />} label="iOS" /> : <Chip icon={<AndroidIcon />} label="Android" color="success" />,
    exitReason: (value) => {
      const colors: { [key: string]: 'default' | 'error' | 'warning' | 'info' | 'success' } = {
        'rage-quit': 'error',
        'crash': 'warning',
        'afk': 'info',
        'natural': 'success'
      };
      return <Chip label={value} color={colors[value] || 'default'} variant="outlined" />;
    },
    revenueUsd: (value) => `$${value.toFixed(2)}`,
  };

  return (
    <Box maxWidth={1400} mx="auto" px={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Player Engagement
      </Typography>

      <Box mb={3}>
        <Box mb={2}>
          <FilterBar filters={filters} />
        </Box>
        <Box display="flex" gap={2} flexWrap="wrap">
          {summaryCards.map((card) => (
            <Box key={card.title} flex="1" minWidth={180}>
              <SummaryCard {...card} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" gap={3} mb={4} alignItems="stretch">
        <Box flex="1" maxWidth="30%">
          <Box height="100%" display="flex" flexDirection="column">
            <Typography variant="h6" mb={2}>Key Insights</Typography>
            <KeyInsights insights={insights} />
          </Box>
        </Box>
        <Box flex="2" minHeight={420}>
          <Typography variant="h6" mb={1}>Daily Active Users</Typography>
          <PlayerChartWrapper type="bar" data={filteredChartData} metrics={['dau']} />
        </Box>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <Box flex="1" minWidth="400px">
          <Typography variant="h6">Ad Views</Typography>
          <PlayerChartWrapper type="line" data={filteredChartData} metrics={['adViews']} />
        </Box>
        <Box flex="1" minWidth="400px">
          <Typography variant="h6">XP Earned</Typography>
          <PlayerChartWrapper type="line" data={filteredChartData} metrics={['xp']} />
        </Box>
        <Box flex="1" minWidth="400px">
          <Typography variant="h6">Exit Reasons</Typography>
          <PlayerChartWrapper type="bar" data={filteredChartData} metrics={['rageQuits', 'crash', 'afk', 'natural']} />
        </Box>
      </Box>

      <Typography variant="h6" mt={4} mb={1}>Player Sessions</Typography>

      <Box display="flex" gap={2} mb={1}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Exit Reason</InputLabel>
          <Select
            value={exitReasonFilter}
            label="Exit Reason"
            onChange={e => setExitReasonFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="rage-quit">Rage Quit</MenuItem>
            <MenuItem value="afk">AFK</MenuItem>
            <MenuItem value="natural">Natural</MenuItem>
            <MenuItem value="crash">Crash</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataTable columns={data.tableColumns} rows={filteredTableData} customRenderers={customRenderers} />
    </Box>
  );
};

export default PlayerEngagement;