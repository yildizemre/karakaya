import { HourlyData } from '../types';

interface HourlyChartProps {
  data: HourlyData[];
}

export function HourlyChart({ data }: HourlyChartProps) {
  const maxValue = Math.max(...data.map(d => d.parts_count), 1);
  const currentHour = new Date().getHours();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Son 24 Saat - Saatlik Parça Sayısı</h3>
      <div className="flex items-end justify-between gap-1.5 h-72">
        {data.map((item, index) => {
          const height = (item.parts_count / maxValue) * 100;
          const itemHour = parseInt(item.hour.split(':')[0]);
          const isCurrentHour = itemHour === currentHour;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 min-w-0">
              <div className="relative w-full flex items-end justify-center h-full group">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isCurrentHour
                      ? 'bg-blue-600 shadow-lg'
                      : item.parts_count > 0
                        ? 'bg-blue-400 hover:bg-blue-500'
                        : 'bg-gray-200'
                  }`}
                  style={{
                    height: `${Math.max(height, 2)}%`,
                    minHeight: item.parts_count > 0 ? '8px' : '3px'
                  }}
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 pointer-events-none">
                    <div className="text-center">
                      <div className="font-bold">{item.parts_count}</div>
                      <div className="text-gray-300 text-[10px]">parça</div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              {index % 4 === 0 && (
                <span className="text-xs text-gray-700 font-semibold mt-1">{item.hour}</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded shadow-sm"></div>
          <span className="text-gray-700 font-medium">Şu anki saat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span className="text-gray-700 font-medium">Geçmiş saatler</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-gray-700 font-medium">Çalışma dışı</span>
        </div>
      </div>
    </div>
  );
}
