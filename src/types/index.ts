export interface Operation {
  id: string;
  part_detected_at: string;
  operation_started_at: string | null;
  operation_completed_at: string | null;
  duration_seconds: number | null;
  is_successful: boolean;
  alarm_triggered: boolean;
  alarm_triggered_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface Alarm {
  id: string;
  operation_id: string;
  alarm_type: 'timeout' | 'no_personnel' | 'system_error';
  triggered_at: string;
  acknowledged_at: string | null;
  acknowledged_by: string | null;
  created_at: string;
}

export interface DailyStats {
  id: string;
  date: string;
  total_parts: number;
  successful_operations: number;
  alarm_count: number;
  avg_duration_seconds: number | null;
  min_duration_seconds: number | null;
  max_duration_seconds: number | null;
  downtime_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface HourlyData {
  hour: string;
  parts_count: number;
}

export interface DashboardStats {
  total_parts_today: number;
  success_rate: number;
  alarms_today: number;
  avg_duration: number;
  hourly_data: HourlyData[];
  weekly_alarms: { day: string; count: number }[];
  recent_alarms: Alarm[];
}
