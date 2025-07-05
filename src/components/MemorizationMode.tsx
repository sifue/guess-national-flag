import React, { useEffect, useState } from 'react';
import { allFlags } from '../data/allFlags';
import { geoguessrFlags, geoguessrFlagsByRegion } from '../data/geoguessrFlags';
import { groupFlagsByRegion, codeToRegionMap } from '../data/regionFlags';
import type { Flag } from '../data/flags';

interface MemorizationModeProps {
  onReturn?: () => void;
}

const MemorizationMode: React.FC<MemorizationModeProps> = ({ onReturn }) => {
  const [groupedFlags, setGroupedFlags] = useState<Record<string, Flag[]>>({});
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [regionsList, setRegionsList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllFlags, setShowAllFlags] = useState(false);
  const [allFlagsList, setAllFlagsList] = useState<Flag[]>([]);
  const [showGeoguessrOnly, setShowGeoguessrOnly] = useState(false);

  useEffect(() => {
    // データを読み込み、地域ごとにグループ化
    const grouped = showGeoguessrOnly ? geoguessrFlagsByRegion : groupFlagsByRegion(allFlags);
    const currentAllFlags = showGeoguessrOnly ? geoguessrFlags : allFlags;
    
    // 地域のリストを取得し、フラグが存在する地域のみを保持
    const regions = Object.keys(grouped).filter(region => grouped[region].length > 0);
    
    setGroupedFlags(grouped);
    setRegionsList(regions);
    setAllFlagsList(currentAllFlags);
    setIsLoading(false);
    
    // 最初の地域を選択
    if (regions.length > 0) {
      setSelectedRegion(regions[0]);
    }
  }, [showGeoguessrOnly]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setShowAllFlags(false);
  };

  const handleShowAllFlags = () => {
    setShowAllFlags(true);
    setSelectedRegion(null);
  };

  const toggleGeoguessrFilter = () => {
    setShowGeoguessrOnly(!showGeoguessrOnly);
    setShowAllFlags(false);
    setSelectedRegion(null);
  };

  const handleReturn = () => {
    if (onReturn) {
      onReturn();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 border-t-transparent" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">国旗データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">国旗暗記モード</h1>
          <p className="text-center text-gray-600 mb-4">
            地域ごとに分類された国旗と国名を暗記できます
          </p>
          <div className="flex justify-center items-center gap-6 mb-4">
            <a href="#" onClick={(e) => { e.preventDefault(); handleReturn(); }} className="text-blue-600 hover:text-blue-800">
              ← トップに戻る
            </a>
            <button
              onClick={toggleGeoguessrFilter}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showGeoguessrOnly
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
              }`}
            >
              {showGeoguessrOnly ? 'GeoGuessr対応国のみ表示中' : 'GeoGuessr対応国のみ表示'}
            </button>
          </div>
        </header>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-700">地域を選択</h2>
            {showGeoguessrOnly && (
              <p className="text-sm text-orange-600 mt-1">GeoGuessr対応国のみ表示中（131カ国）</p>
            )}
          </div>
          <div className="p-4 overflow-x-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={handleShowAllFlags}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  showAllFlags
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                }`}
              >
                すべて表示
              </button>
              {regionsList.map(region => (
                <button
                  key={region}
                  onClick={() => handleRegionChange(region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedRegion === region && !showAllFlags
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showAllFlags && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold text-gray-700">
                {showGeoguessrOnly ? 'GeoGuessr対応国一覧' : 'すべての国旗一覧'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {allFlagsList.length}カ国/地域
                {showGeoguessrOnly && <span className="text-orange-600 ml-2">（GeoGuessr対応国のみ）</span>}
              </p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allFlagsList.map(flag => (
                  <div key={flag.code} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                      <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{flag.code}</span>
                      <span className="text-gray-600 text-sm">{codeToRegionMap[flag.code] || '未分類'}</span>
                    </div>
                    <div className="p-4 flex items-center space-x-4">
                      <div className="w-24 h-16 flex-shrink-0 overflow-hidden shadow-sm">
                        <img 
                          src={flag.imageUrl} 
                          alt={`${flag.name}の国旗`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-800">{flag.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedRegion && !showAllFlags && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold text-gray-700">{selectedRegion}の国旗一覧</h2>
              <p className="text-sm text-gray-500 mt-1">
                {groupedFlags[selectedRegion]?.length || 0}カ国/地域
              </p>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedFlags[selectedRegion]?.map(flag => (
                  <div key={flag.code} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                      <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{flag.code}</span>
                    </div>
                    <div className="p-4 flex items-center space-x-4">
                      <div className="w-24 h-16 flex-shrink-0 overflow-hidden shadow-sm">
                        <img 
                          src={flag.imageUrl} 
                          alt={`${flag.name}の国旗`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-800">{flag.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {groupedFlags[selectedRegion]?.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  この地域に登録されている国旗はありません
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemorizationMode; 