"use client";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface VotesBarChartProps {
  labels: string[];
  votes: number[];
}

export default function VotesBarChart({ labels, votes }: VotesBarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Votes',
        data: votes,
        backgroundColor: '#FF5A5F',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
