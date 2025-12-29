
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AttendanceRecord, MonthlyStats } from '../types';

interface DashboardProps {
  records: AttendanceRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ records }) => {
  const stats: MonthlyStats = records.reduce((acc, curr) => {
    if (curr.status === 'presente') {
      acc.totalHours += 8;
      acc.workingDays += 1;
      acc.totalExtra += curr.extraHours;
    } else if (curr.status === 'falta') {
      acc.absences += 1;
    }
    return acc;
  }, { totalHours: 0, totalExtra: 0, absences: 0, workingDays: 0 });

  const chartData = records.filter(r => r.status === 'presente').slice(-7).map(r => ({
    name: new Date(r.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
    horas: 8 + r.extraHours,
    extras: r.extraHours
  }));

  const pieData = [
    { name: 'Trabalho', value: stats.workingDays, color: '#3b82f6' },
    { name: 'Folgas/Feriados', value: records.length - stats.workingDays - stats.absences, color: '#94a3b8' },
    { name: 'Faltas', value: stats.absences, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Dias Trabalhados', value: stats.workingDays, color: 'blue' },
          { label: 'Total Horas Mes', value: stats.totalHours, color: 'indigo' },
          { label: 'Horas Extras', value: stats.totalExtra, color: 'emerald' },
          { label: 'Faltas', value: stats.absences, color: 'rose' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Jornada - Últimos 7 dias</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="horas" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Horas Totais" />
                <Bar dataKey="extras" fill="#10b981" radius={[4, 4, 0, 0]} name="Horas Extras" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold mb-6">Distribuição Mensal</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
               <span className="text-sm text-slate-400">Total</span>
               <span className="text-2xl font-bold">{records.length}</span>
               <span className="text-xs text-slate-400">dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
