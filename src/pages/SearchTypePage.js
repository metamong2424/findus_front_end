import React from 'react';
import { Link } from 'react-router-dom';

function SearchTypePage() {
  return (
    <div>
      <h1>검색 유형 선택</h1>
      <Link to="/work">
        <button>작품으로 검색</button>
      </Link>
      <Link to="/regions">
        <button>지역으로 검색</button>
      </Link>
    </div>
  );
}

export default SearchTypePage;