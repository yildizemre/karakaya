interface WeeklyAlarmChartProps {
  data: { day: string; count: number }[];
}

export function WeeklyAlarmChart({ data }: WeeklyAlarmChartProps) {
  const maxValue = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık Alarm Dağılımı</h3>
      <div className="space-y-4">
        {data.map((item, index) => {
          const width = (item.count / maxValue) * 100;
          const isHighAlert = item.count > maxValue * 0.7;

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-24 text-sm font-medium text-gray-700">{item.day}</div>
              <div className="flex-1 relative">
                <div className="h-8 bg-gray-100 rounded overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isHighAlert ? 'bg-red-500' : 'bg-orange-400'
                    }`}
                    style={{ width: `${width}%` }}
                  ></div>
                </div>
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-700"
                >
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <span className="text-gray-600">Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Yüksek</span>
        </div>
      </div>
    </div>
  );
}
