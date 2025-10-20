import { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { KPICard } from './components/KPICard';
import { HourlyChart } from './components/HourlyChart';
import { WeeklyAlarmChart } from './components/WeeklyAlarmChart';
import { AlarmHistory } from './components/AlarmHistory';
import { SystemStatus } from './components/SystemStatus';
import { getMockDashboardData } from './utils/mockData';
import { DashboardStats } from './types';

function App() {
  const [dashboardData, setDashboardData] = useState<DashboardStats>(getMockDashboardData());

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(getMockDashboardData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <SystemStatus />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <KPICard
            title="Toplam İşlenen Parça"
            value={dashboardData.total_parts_today}
            icon={Package}
            color="blue"
            trend={{ value: 8.2, isPositive: true }}
          />
          <KPICard
            title="Başarılı İşlem Oranı"
            value={`${dashboardData.success_rate}%`}
            icon={TrendingUp}
            color="green"
            trend={{ value: 2.4, isPositive: true }}
          />
          <KPICard
            title="Bugünkü Alarm Sayısı"
            value={dashboardData.alarms_today}
            icon={AlertTriangle}
            color="red"
            trend={{ value: 15.3, isPositive: false }}
          />
          <KPICard
            title="Ortalama İşlem Süresi"
            value={formatDuration(dashboardData.avg_duration)}
            icon={Clock}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <HourlyChart data={dashboardData.hourly_data} />
          </div>
          <div>
            <WeeklyAlarmChart data={dashboardData.weekly_alarms} />
          </div>
        </div>

        <div className="mt-6">
          <AlarmHistory alarms={dashboardData.recent_alarms} />
        </div>

        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>CX Teknoloji - Escher Sense</span>
              <span className="text-gray-400">•</span>
              <span>v1.0.0</span>
            </div>
            <div>
              <span className="font-medium">İletişim:</span> info@cxteknoloji.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
