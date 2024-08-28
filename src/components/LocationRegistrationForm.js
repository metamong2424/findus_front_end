import React, { useState } from 'react';
import axios from 'axios';

const LocationRegistrationForm = () => {
  const [formData, setFormData] = useState({
    placename: '',
    artwork_name: '',
    artwork_season: '',
    artwork_ep: '',
    description: '',
    address_region: '',
    address_city: '',
    address_district: '',
    latitude: '',
    longitude: '',
    detailed_address: '',
    latestshot: '',
    type: ''
  });

  const [files, setFiles] = useState({
    img_place: null,
    img_upload: null,
    img_upload2: null,
    marker_image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles({ ...files, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append text data
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Append files
    Object.keys(files).forEach(key => {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:5000/register-location', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Location registered:', response.data);
      alert('새로운 로케이션이 성공적으로 등록되었습니다.');
      // 폼 리셋 또는 다른 동작 수행
    } catch (error) {
      console.error('Error registering location:', error);
      alert('로케이션 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="placename">장소 이름:</label>
        <input
          type="text"
          id="placename"
          name="placename"
          value={formData.placename}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="artwork_name">작품 이름:</label>
        <input
          type="text"
          id="artwork_name"
          name="artwork_name"
          value={formData.artwork_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="artwork_season">시즌:</label>
        <input
          type="text"
          id="artwork_season"
          name="artwork_season"
          value={formData.artwork_season}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="artwork_ep">에피소드:</label>
        <input
          type="text"
          id="artwork_ep"
          name="artwork_ep"
          value={formData.artwork_ep}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">설명:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="address_region">지역:</label>
        <input
          type="text"
          id="address_region"
          name="address_region"
          value={formData.address_region}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="address_city">도시:</label>
        <input
          type="text"
          id="address_city"
          name="address_city"
          value={formData.address_city}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="address_district">구역:</label>
        <input
          type="text"
          id="address_district"
          name="address_district"
          value={formData.address_district}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="latitude">위도:</label>
        <input
          type="text"
          id="latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="longitude">경도:</label>
        <input
          type="text"
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="detailed_address">상세 주소:</label>
        <input
          type="text"
          id="detailed_address"
          name="detailed_address"
          value={formData.detailed_address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="latestshot">최근 촬영일:</label>
        <input
          type="date"
          id="latestshot"
          name="latestshot"
          value={formData.latestshot}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="type">유형:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="img_place">장소 이미지:</label>
        <input
          type="file"
          id="img_place"
          name="img_place"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="img_upload">업로드 이미지 1:</label>
        <input
          type="file"
          id="img_upload"
          name="img_upload"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="img_upload2">업로드 이미지 2:</label>
        <input
          type="file"
          id="img_upload2"
          name="img_upload2"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        <label htmlFor="marker_image">마커 이미지:</label>
        <input
          type="file"
          id="marker_image"
          name="marker_image"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <button type="submit">등록</button>
    </form>
  );
};

export default LocationRegistrationForm;