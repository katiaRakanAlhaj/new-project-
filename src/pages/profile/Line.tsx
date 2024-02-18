import { useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';

const LineChart = ({ themeMode }: { themeMode: string }) => {
  const theme = useTheme();
  return (
    <Line
      style={{
        flex: 1,
        backgroundColor:
          themeMode == 'dark'
            ? theme.palette.primary.dark
            : theme.palette.primary.light,
      }}
      data={{
        labels: ['Jun', 'Jul', 'Aug', 'sdadsa', 'sadsad2', '2aewqe'],
        datasets: [
          {
            label: 'line1',
            data: [5, 6, 7, 23, 18, 26],
          },
          {
            label: 'line2',
            data: [3, 2, 1, 41, 5, 12],
          },
          {
            label: 'line3',
            data: [8, 4, 2, 10, 7, 25],
          },
          {
            label: 'line4',
            data: [20, 40, 12, 4, 5, 22],
          },
        ],
      }}
    />
  );
};

export default LineChart;
