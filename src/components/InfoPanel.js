import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InfoPanel = ({ selectedMarker }) => {
  const [work, setWork] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedMarker) {
      // Fetch Work data
      fetch(`http://localhost:5000/api/work/${selectedMarker.work_id}`)
        .then(response => response.json())
        .then(data => setWork(data))
        .catch(error => console.error('Error fetching work:', error));

      // Fetch Images data
      fetch(`http://localhost:5000/api/place/${selectedMarker.place_id}`)
        .then(response => response.json())
        .then(data => {
          if (data.Images && Array.isArray(data.Images)) {
            setImages(data.Images);
          } else {
            console.error('Unexpected image data structure:', data);
          }
        })
        .catch(error => console.error('Error fetching place data:', error));
    }
  }, [selectedMarker]);

  if (!selectedMarker) return null;

  const renderImages = () => {
    if (images.length === 0) return null;

    return images.map((img, index) => {
      const imageUrl = `http://localhost:5000${img.image_url}`;
      return (
        <img
          key={index}
          src={imageUrl}
          alt={`${selectedMarker.place_name} - ${img.image_url.split('/').pop()}`}
          style={{ width: '100%', display: 'block', marginBottom: '10px' }}
        />
      );
    });
  };

  const formatOpeningHours = (hours) => {
  if (hours === "nan") return "정보 없음";

  // "영업시간:" 라벨을 추가한 후, 줄 바꿈 처리
  return (
    <>
      <br />
      {hours.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedMarker.place_name,
          text: `Check out this place: ${selectedMarker.place_name}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Share not supported on this browser');
    }
  };



  return (
    <div className="info-panel-bottom">
      <div className="info-panel-header">
        <h2>{selectedMarker.place_name}</h2>
        <button onClick={handleShareClick}>
          공유
        </button>
      </div>
      <div className="info-panel-content">
        {renderImages()}
        {work && (
          <>
            <p><strong>작품 이름:</strong> {work.work_name}</p>
            <p><strong>시즌:</strong> {work.work_season} <strong>에피소드:</strong> {work.work_ep}</p>
          </>
        )}
        <p><strong>설명:</strong> {selectedMarker.description}</p>
        <p><strong>지역:</strong> {selectedMarker.address_region}</p>
        <p><strong>도시:</strong> {selectedMarker.address_city}</p>
        <p><strong>구역:</strong> {selectedMarker.address_district}</p>
        <p><strong>상세 주소:</strong> {selectedMarker.detailed_address}</p>
        <p><strong>최근 촬영일:</strong> {selectedMarker.latestshot_date}</p>
        <p><strong>영업시간:</strong> {formatOpeningHours(selectedMarker.opening_hours)}</p>

        <Link to={`/single-marker/${selectedMarker.place_id}`}>
          <button className="info-panel-button">
            로케이션 상세보기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InfoPanel;