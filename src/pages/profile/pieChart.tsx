import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  return (
    <Pie
      data={{
        labels: ['Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'sadsada',
            data: [5, 6, 7],
          },
          {
            label: 'asdsads',
            data: [3, 2, 1],
          },
        ],
      }}
    />
  );
};

export default PieChart;
