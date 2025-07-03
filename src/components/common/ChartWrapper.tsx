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

interface ChartWrapperProps {
  type: 'bar' | 'line';
  data: any;
  options?: any;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ type, data, options }) => {
  // Prepare chart.js data structure
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <Box p={3} bgcolor="#F6F8F3" borderRadius={2} minHeight={220} display="flex" alignItems="center" justifyContent="center">No data</Box>;
  }

  const chartData = {
    labels: data.map((d: any) => d.month),
    datasets: [
      {
        label: 'Actual',
        data: data.map((d: any) => d.actual),
        backgroundColor: '#23411C',
      },
      {
        label: 'Budget',
        data: data.map((d: any) => d.budget),
        backgroundColor: '#A3C47C',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
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

export default ChartWrapper; 