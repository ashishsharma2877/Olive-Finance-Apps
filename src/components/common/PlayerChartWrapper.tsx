import React from 'react';
import { Box } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

interface PlayerChartWrapperProps {
  type: 'bar' | 'line';
  data: any;
  options?: any;
  metrics?: string[];
}

const PlayerChartWrapper: React.FC<PlayerChartWrapperProps> = ({ 
  type, 
  data, 
  options, 
  metrics = ['dau', 'adViews', 'xp'] 
}) => {
  // Prepare chart.js data structure for player engagement data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Box p={3} bgcolor="#F6F8F3" borderRadius={2} minHeight={220} display="flex" alignItems="center" justifyContent="center">No data</Box>;
  }

  // Define colors for different metrics
  const colors = {
    dau: '#23411C',
    adViews: '#A3C47C', 
    xp: '#6B8E23',
    sessionLength: '#8FBC8F',
    rageQuits: '#CD5C5C'
  };

  const chartData = {
    labels: data.map((d: any) => {
      // Format date for display
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: metrics.map((metric: string) => ({
      label: metric === 'dau' ? 'Daily Active Users' : 
             metric === 'adViews' ? 'Ad Views' :
             metric === 'xp' ? 'Experience Points' :
             metric === 'sessionLength' ? 'Session Length (min)' :
             metric === 'rageQuits' ? 'Rage Quits' : metric,
      data: data.map((d: any) => d[metric]),
      backgroundColor: colors[metric as keyof typeof colors] || '#23411C',
      borderColor: colors[metric as keyof typeof colors] || '#23411C',
      borderWidth: 2,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
    },
    ...options,
  };

  return (
    <Box p={3} bgcolor="#F6F8F3" borderRadius={2} minHeight={220} width="100%">
      <Box width="100%" height="400px" minWidth="600px" overflow="auto">
        {type === 'bar' ? (
          <Bar data={chartData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Line data={chartData} options={chartOptions} style={{ width: '100%', height: '100%' }} />
        )}
      </Box>
    </Box>
  );
};

export default PlayerChartWrapper; 