import { Activity, Camera, Wifi } from 'lucide-react';
import { useState, useEffect } from 'react';

export function SystemStatus() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Karakaya86 - Hava Püskürtme Kontrol Sistemi</h2>
          <p className="text-sm text-gray-600 mt-1">Escher Sense Görüntü İşleme Sistemi</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">{formatTime(currentTime)}</p>
          <p className="text-sm text-gray-600">{formatDate(currentTime)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <Activity className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-700 font-medium">Sistem Aktif</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <Camera className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-700 font-medium">Kamera 1 & 2</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <Wifi className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-700 font-medium">Bağlantı</span>
        </div>
      </div>
    </div>
  );
}
