import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Droplet, Flame } from 'lucide-react';
import { HealthMetrics } from '../types';

const data = [
  { name: 'Mon', steps: 8000, calories: 2200, water: 2000 },
  { name: 'Tue', steps: 9000, calories: 2400, water: 2500 },
  { name: 'Wed', steps: 7500, calories: 2100, water: 1800 },
  { name: 'Thu', steps: 8500, calories: 2300, water: 2200 },
  { name: 'Fri', steps: 10000, calories: 2600, water: 2400 },
];

export default function HealthDashboard() {
  const metrics: HealthMetrics = {
    steps: 8500,
    calories: 2300,
    water: 2200,
    workouts: 3,
  };

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={<Activity className="w-6 h-6 text-green-500" />}
          title="Steps"
          value={metrics.steps}
          target={10000}
        />
        <MetricCard
          icon={<Flame className="w-6 h-6 text-orange-500" />}
          title="Calories"
          value={metrics.calories}
          target={2500}
        />
        <MetricCard
          icon={<Droplet className="w-6 h-6 text-blue-500" />}
          title="Water (ml)"
          value={metrics.water}
          target={2500}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Weekly Progress</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="steps" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              <Area type="monotone" dataKey="calories" stroke="#F97316" fill="#F97316" fillOpacity={0.2} />
              <Area type="monotone" dataKey="water" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, title, value, target }: { 
  icon: React.ReactNode;
  title: string;
  value: number;
  target: number;
}) {
  const progress = (value / target) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        {icon}
        <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
      </div>
      <div className="mt-2">
        <span className="text-2xl font-bold dark:text-white">{value.toLocaleString()}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400"> / {target.toLocaleString()}</span>
      </div>
      <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}