import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SeasonDetailPage() {
  const { workKey, seasonKey } = useParams();
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/work/${workKey}/season/${seasonKey}/details`)
      .then(response => {
        console.log('API 응답 데이터:', response.data);
        setSeasonDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching season details:', error);
        setError('시즌 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [workKey, seasonKey]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!seasonDetails) return <div>시즌 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>{seasonDetails.work_name} - {seasonDetails.work_season}</h1>
      <p>{seasonDetails.description}</p>
      {seasonDetails.poster && (
        <img
          src={seasonDetails.poster}  // API에서 받은 포스터 URL을 그대로 사용
          alt={seasonDetails.work_name}
          style={{ maxWidth: '300px' }}
        />
      )}
      <p>방영 기간: {seasonDetails.start_date} ~ {seasonDetails.end_date}</p>
    </div>
  );
}

export default SeasonDetailPage;
