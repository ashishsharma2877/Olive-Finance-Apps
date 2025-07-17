import React, { useState, useMemo } from 'react';
import data from '../data/playerMonetization.json';
import type { FilterConfig } from './common/FilterBar';
import FilterBar from './common/FilterBar';
import SummaryCard from './common/SummaryCard';
import KeyInsights from './common/KeyInsights';
import PlayerChartWrapper from './common/PlayerChartWrapper';
import DataTable from './common/DataTable';
import { Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import PercentIcon from '@mui/icons-material/Percent';

const PlayerMonetization: React.FC = () => {
  const [game, setGame] = useState('All');
  const [platform, setPlatform] = useState('All');
  const [country, setCountry] = useState('All');
  const [timePeriod, setTimePeriod] = useState(data.filters.timePeriods[0]);

  const filters: FilterConfig[] = [
    { label: 'Game', value: game, options: data.filters.games.map(g => ({ label: g, value: g })), onChange: setGame },
    { label: 'Platform', value: platform, options: data.filters.platforms.map(p => ({ label: p, value: p })), onChange: setPlatform },
    { label: 'Country', value: country, options: data.filters.countries.map(c => ({ label: c, value: c })), onChange: setCountry },
    { label: 'Time Period', value: timePeriod, options: data.filters.timePeriods.map(t => ({ label: t, value: t })), onChange: setTimePeriod },
  ];

  const filteredChartData = useMemo(() => {
    return data.chartData.filter(row =>
      (game === 'All' || row.game === game) &&
      (platform === 'All' || row.platform === platform) &&
      (country === 'All' || row.country === country) &&
      (timePeriod === 'All' || row.timePeriod === timePeriod)
    );
  }, [game, platform, country, timePeriod]);

  const filteredTableData = useMemo(() => {
    return data.tableData.filter(row =>
      (game === 'All' || row.game === game) &&
      (platform === 'All' || row.platform === platform) &&
      (country === 'All' || row.country === country)
    );
  }, [game, platform, country]);

  const summaryCards = [
    {
      title: 'Total Revenue',
      value: `$${data.summary.totalRevenueUsd.toLocaleString()}`,
      icon: <ShoppingCartIcon color="primary" />, color: '#E3F2FD'
    },
    {
      title: 'Avg Revenue/User',
      value: `$${data.summary.avgRevenuePerUser.toFixed(2)}`,
      icon: <TrendingUpIcon color="secondary" />, color: '#F3E5F5'
    },
    {
      title: 'Top Item',
      value: data.summary.topItem,
      icon: <StarIcon color="warning" />, color: '#FFF8E1'
    },
    {
      title: 'Conversion Rate',
      value: data.summary.conversionRate,
      icon: <PercentIcon color="success" />, color: '#E8F5E9'
    },
  ];

  const insights = data.insights.map(insight => ({
    ...insight,
    type: insight.type as 'success' | 'info' | 'warning' | 'error'
  }));

  return (
    <Box maxWidth={1400} mx="auto" px={2}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Player Monetization
      </Typography>

      <Box mb={3}>
        <FilterBar filters={filters} />
        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          {summaryCards.map(card => (
            <Box key={card.title} flex="1" minWidth={200} maxWidth={250}>
              <SummaryCard {...card} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" gap={3} mb={4} alignItems="stretch">
        <Box flex="1" maxWidth="30%">
          <Typography variant="h6" mb={1}>Key Insights</Typography>
          <KeyInsights insights={insights} />
        </Box>
        <Box flex="2" minHeight={420}>
          <Typography variant="h6" mb={1}>Revenue Trend</Typography>
          <PlayerChartWrapper type="line" data={filteredChartData} metrics={['revenueUsd']} />
        </Box>
      </Box>

      <Typography variant="h6" mt={4} mb={1}>Purchase Transactions</Typography>
      <DataTable columns={data.tableColumns} rows={filteredTableData} />
    </Box>
  );
};

export default PlayerMonetization;
