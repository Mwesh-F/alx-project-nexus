'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF5A5F', '#00C49F', '#FFBB28', '#0088FE', '#FF8042', '#A28EFF', '#FF6F91'];

const ResultsPage = () => {
  const contestants = useSelector((state: RootState) => state.contestants.contestants);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Live Voting Results</h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={contestants}
            dataKey="votes"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {contestants.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsPage;
