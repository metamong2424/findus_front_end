import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link to="/search">
        <button>검색</button>
      </Link>
    </div>
  );
}

export default MainPage;