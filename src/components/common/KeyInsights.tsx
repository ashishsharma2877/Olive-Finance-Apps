import React from 'react';
import { Alert, Stack } from '@mui/material';

interface Insight {
  type: 'warning' | 'info' | 'success' | 'error';
  message: string;
}

interface KeyInsightsProps {
  insights: Insight[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ insights }) => (
  <Stack spacing={1}>
    {insights.map((insight, idx) => (
      <Alert key={idx} severity={insight.type} variant="filled">
        {insight.message}
      </Alert>
    ))}
  </Stack>
);

export default KeyInsights; 