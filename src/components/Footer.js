import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
  const navigate = useNavigate();

  const handleMapClick = () => {
    const targetPath = '/multi-marker';
    const currentPath = window.location.pathname;

    if (currentPath !== targetPath) {
      // 현재 경로가 /multi-marker가 아니면 /multi-marker로 이동
      navigate(targetPath);
    } else {
      // 이미 /multi-marker에 있을 경우 강제로 리로드
      navigate(targetPath, { replace: true });
      window.location.reload(); // 페이지 리로드
    }
  };

  return (
    <div className="footer">
      <button onClick={() => navigate('/')}>홈</button>
      <button onClick={handleMapClick}>지도</button>
      <button onClick={() => navigate('/search')}>검색</button>
      <button onClick={() => navigate('/mypage')}>마이페이지</button>
    </div>
  );
}

export default Footer;
