import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import InfoPanel from './InfoPanel';
import Footer from './Footer';
import '../css/SidePanel.css';

function MultiMarkerMap() { //컴포넌트는 대문자로 시작
  const { id } = useParams();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]); // 모든 위치 정보
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택된 위치
  const [center, setCenter] = useState({ lat: 35.6895, lng: 139.6917 }); // 지도 중심 좌표 (도쿄)
  const [isPanelVisible, setIsPanelVisible] = useState(false); // 패널 표시 여부

  const mapRef = useRef(null);

  useEffect(() => {
    // 모든 장소 정보와 해당 장소에 연결된 이미지를 가져오는 API 호출
    axios.get('http://localhost:5000/api/place')
      .then(response => {
        setLocations(response.data); // 모든 위치 정보 저장

        // URL의 id와 일치하는 위치 찾기
        const foundLocation = response.data.find(loc => loc.place_id === parseInt(id));
        if (foundLocation) {
          setSelectedLocation(foundLocation); // 선택된 위치 설정
          setCenter({
            lat: parseFloat(foundLocation.latitude),
            lng: parseFloat(foundLocation.longitude)
          }); // 지도 중심 설정
        }
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, [id]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setCenter({
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    });
    setIsPanelVisible(true);
    if (mapRef.current) {
      mapRef.current.panBy(0, window.innerHeight * 0.10);
    }
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
    if (mapRef.current) {
      if (!isPanelVisible) {
        mapRef.current.panBy(0, window.innerHeight * 0.15);
      } else {
        mapRef.current.panBy(0, -window.innerHeight * 0.15);
      }
    }
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const handleAddLocationClick = () => {
    navigate('/add-location'); // 지도 등록 폼 페이지로 이동
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <LoadScript googleMapsApiKey="AIzaSyB7rhJyynTM4wwx9D4Gu3fxDjhHAj2QyB0">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100vh',
          }}
          center={center}
          zoom={17.5}
          onLoad={onLoad}
          options={{
            gestureHandling: 'greedy'
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.place_id}
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude)
              }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* 지도 등록 폼으로 이동하는 버튼 */}
      <button
        onClick={handleAddLocationClick}
        className={`add-location-button ${isPanelVisible ? 'panel-open' : ''}`}>
       Add Location
      </button>

      <div className={`panel-container ${!isPanelVisible ? 'panel-hidden' : ''}`}>
        <div className="panel-header">
          <div className="panel-handle" onClick={togglePanel}></div>
          {selectedLocation ? selectedLocation.placename : "Unknown Place"}
        </div>
        <div className="panel-content">
          {selectedLocation && (
            <div>
              <InfoPanel selectedMarker={selectedLocation} />
            </div>
          )}
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default MultiMarkerMap;
