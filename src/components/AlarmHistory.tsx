import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Alarm } from '../types';

interface AlarmHistoryProps {
  alarms: Alarm[];
}

const alarmTypeLabels = {
  timeout: 'Süre Aşımı',
  no_personnel: 'Personel Yok',
  system_error: 'Sistem Hatası'
};

const alarmTypeColors = {
  timeout: 'text-red-600 bg-red-50 border-red-200',
  no_personnel: 'text-orange-600 bg-orange-50 border-orange-200',
  system_error: 'text-purple-600 bg-purple-50 border-purple-200'
};

export function AlarmHistory({ alarms }: AlarmHistoryProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatRelativeTime = (isoString: string) => {
    const now = new Date();
    const then = new Date(isoString);
    const diffMinutes = Math.floor((now.getTime() - then.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return 'Az önce';
    if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} saat önce`;
    return `${Math.floor(diffHours / 24)} gün önce`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Son Alarmlar
        </h3>
      </div>
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {alarms.map((alarm) => (
          <div key={alarm.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      alarmTypeColors[alarm.alarm_type]
                    }`}
                  >
                    {alarmTypeLabels[alarm.alarm_type]}
                  </span>
                  {alarm.acknowledged_at ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-orange-500 animate-pulse" />
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Tetiklenme:</span>
                    <span>{formatTime(alarm.triggered_at)}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{formatRelativeTime(alarm.triggered_at)}</span>
                  </div>
                  {alarm.acknowledged_at && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-medium text-green-600">Onaylandı:</span>
                      <span>{alarm.acknowledged_by}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">{formatTime(alarm.acknowledged_at)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                {alarm.acknowledged_at ? (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
