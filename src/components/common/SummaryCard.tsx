import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
  <Card sx={{ minWidth: 180, background: color || 'background.paper', boxShadow: 1 }}>
    <CardContent>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        {icon}
        <Typography variant="h6" component="div">
          {value}
        </Typography>
      </Box>
      <Typography color="text.secondary" variant="body2">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

export default SummaryCard; 