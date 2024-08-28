import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import '../css/SingleMarker.css';

// 구글 맵의 컨테이너 스타일을 정의
const mapContainerStyle = {
  width: '100%',
  height: '40vh',
};

function SingleMarkerMap({ markerId }) {
  const [markerData, setMarkerData] = useState(null);  // 특정 장소의 데이터를 저장하는 상태
  const [aniPlaceImages, setAniPlaceImages] = useState([]);  // 애니메이션 장소 이미지를 저장하는 상태
  const [otherImages, setOtherImages] = useState([]);  // 실제 장소 및 사용자 업로드 이미지를 저장하는 상태
  const [isFavorite, setIsFavorite] = useState(false);  // 즐겨찾기 여부를 저장하는 상태

  const navigate = useNavigate();  // 페이지 이동을 위해 React Router의 useNavigate 훅 사용

  // 컴포넌트가 마운트되거나 markerId가 변경될 때 장소 데이터를 가져오는 효과
  useEffect(() => {
    const fetchMarkerData = async () => {
      try {
        // API에서 특정 장소의 데이터를 가져옴
        const markerResponse = await axios.get(`http://localhost:5000/api/place/${markerId}`);
        setMarkerData(markerResponse.data);  // 가져온 데이터를 상태에 저장

        const images = markerResponse.data.Images;

        // 이미지 데이터를 분류하여 상태에 저장
        const aniPlace = images.filter(img => img.image_url.includes('aniPlace'));
        const otherImages = images.filter(img => img.image_url.includes('realPlace') || img.image_url.includes('userUpload'));

        setAniPlaceImages(aniPlace);  // 애니메이션 장소 이미지를 상태에 저장
        setOtherImages(otherImages);  // 실제 장소 및 사용자 업로드 이미지를 상태에 저장

        // 로컬 스토리지에서 즐겨찾기 상태를 확인하고 업데이트
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.includes(markerId));  // 즐겨찾기 상태 설정

      } catch (error) {
        console.error('Error fetching marker data:', error);  // 데이터 가져오기 실패 시 오류 로그 출력
      }
    };

    fetchMarkerData();  // 데이터 가져오기 함수 호출
  }, [markerId]);  // markerId가 변경될 때마다 effect 실행

  // 이미지 로딩 오류 발생 시 해당 이미지를 제거하는 함수
  const handleImageError = (index, imageType) => {
    if (imageType === 'aniPlace') {
      setAniPlaceImages(prevImages => prevImages.filter((_, i) => i !== index));
    } else {
      setOtherImages(prevImages => prevImages.filter((_, i) => i !== index));
    }
  };

  // 지도 클릭 시 다른 페이지로 이동하는 함수
  const handleMapClick = () => {
    if (markerData) {
      navigate(`/multi-marker/${markerData.place_id}`);  // 다중 마커 페이지로 이동
    }
  };

  // 즐겨찾기 추가/제거를 처리하는 함수
  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      // 즐겨찾기에서 제거
      const updatedFavorites = favorites.filter(id => id !== markerId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      // 즐겨찾기에 추가
      favorites.push(markerId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);  // 즐겨찾기 상태를 토글
  };

  // 공유 버튼 클릭 시 브라우저의 공유 API를 호출하는 함수
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: markerData.place_name,  // 공유할 장소 이름
          text: `Check out this place: ${markerData.place_name}`,  // 공유할 텍스트
          url: window.location.href  // 현재 페이지 URL
        });
      } catch (error) {
        console.error('Error sharing:', error);  // 공유 실패 시 오류 로그 출력
      }
    } else {
      console.log('Share not supported on this browser');  // 공유 API를 지원하지 않는 브라우저 로그
    }
  };

  // 영업시간을 포맷팅하는 함수
  const formatOpeningHours = (hours) => {
    if (hours === "nan") return "정보 없음";  // 영업시간 정보가 없을 경우

    // 영업시간 문자열을 줄바꿈을 추가하여 포맷팅
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

  if (!markerData) {
    return <div>Loading...</div>;  // 데이터가 아직 로드되지 않은 경우 로딩 표시
  }

  return (
    <div className="single-marker-container">
      <div className="marker-header">
        <button onClick={handleFavoriteClick}>
          {isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}  {/* 즐겨찾기 상태에 따른 버튼 텍스트 */}
        </button>
        <button onClick={handleShareClick}>
          공유  {/* 공유 버튼 */}
        </button>
      </div>

      {/* 애니메이션 장소 이미지 슬라이더 */}
      {aniPlaceImages.length > 0 && (
        <div className="image-slider">
          <h3>애니메이션 장소</h3>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
          >
            {aniPlaceImages.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:5000${image.image_url}`}
                  alt={`Location ${index + 1}`}
                  onError={() => handleImageError(index, 'aniPlace')}  // 이미지 로드 오류 처리
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* 실제 장소 및 사용자 업로드 이미지 슬라이더 */}
      {otherImages.length > 0 && (
        <div className="image-slider">
          <h3>실제 장소 및 사용자 업로드</h3>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
          >
            {otherImages.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:5000${image.image_url}`}
                  alt={`Location ${index + 1}`}
                  onError={() => handleImageError(index, 'other')}  // 이미지 로드 오류 처리
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* 구글 맵을 표시하는 영역 */}
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyB7rhJyynTM4wwx9D4Gu3fxDjhHAj2QyB0">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{
              lat: parseFloat(markerData.latitude),
              lng: parseFloat(markerData.longitude)
            }}
            zoom={15}
            onClick={handleMapClick}
          >
            <Marker
              position={{
                lat: parseFloat(markerData.latitude),
                lng: parseFloat(markerData.longitude)
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* 장소에 대한 세부 정보를 표시하는 영역 */}
      <div className="info-panel-content">
        <p><strong>설명:</strong> {markerData.description}</p>
        <p><strong>지역:</strong> {markerData.address_region}</p>
        <p><strong>도시:</strong> {markerData.address_city}</p>
        <p><strong>구역:</strong> {markerData.address_district}</p>
        <p><strong>상세 주소:</strong> {markerData.detailed_address}</p>
        <p><strong>최근 촬영일:</strong> {markerData.latestshot_date}</p>
        <p><strong>영업시간:</strong> {formatOpeningHours(markerData.opening_hours)}</p>
      </div>
    </div>
  );
}

export default SingleMarkerMap;
