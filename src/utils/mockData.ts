import { DashboardStats, HourlyData } from '../types';

const generateHourlyData = (): HourlyData[] => {
  const hours = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourStr = hour.getHours().toString().padStart(2, '0') + ':00';
    const hourNum = hour.getHours();
    const isWorkingHour = hourNum >= 6 && hourNum < 22;

    let partsCount = 0;
    if (isWorkingHour) {
      if (hourNum >= 8 && hourNum <= 12) {
        partsCount = Math.floor(Math.random() * 8) + 18;
      } else if (hourNum >= 13 && hourNum <= 17) {
        partsCount = Math.floor(Math.random() * 8) + 16;
      } else if (hourNum >= 18 && hourNum < 22) {
        partsCount = Math.floor(Math.random() * 6) + 12;
      } else {
        partsCount = Math.floor(Math.random() * 5) + 8;
      }
    }

    hours.push({ hour: hourStr, parts_count: partsCount });
  }
  return hours;
};

const generateWeeklyAlarms = () => {
  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  return days.map(day => ({
    day,
    count: Math.floor(Math.random() * 8) + 1
  }));
};

const generateRecentAlarms = () => {
  const alarmTypes = ['timeout', 'no_personnel', 'system_error'] as const;
  const now = new Date();
  return Array.from({ length: 8 }, (_, i) => {
    const triggeredAt = new Date(now.getTime() - i * 45 * 60 * 1000);
    return {
      id: `alarm-${i}`,
      operation_id: `op-${i}`,
      alarm_type: alarmTypes[Math.floor(Math.random() * alarmTypes.length)],
      triggered_at: triggeredAt.toISOString(),
      acknowledged_at: i < 5 ? new Date(triggeredAt.getTime() + 5 * 60 * 1000).toISOString() : null,
      acknowledged_by: i < 5 ? 'Operatör' : null,
      created_at: triggeredAt.toISOString()
    };
  });
};

export const getMockDashboardData = (): DashboardStats => {
  return {
    total_parts_today: 187,
    success_rate: 94.7,
    alarms_today: 12,
    avg_duration: 245,
    hourly_data: generateHourlyData(),
    weekly_alarms: generateWeeklyAlarms(),
    recent_alarms: generateRecentAlarms()
  };
};
