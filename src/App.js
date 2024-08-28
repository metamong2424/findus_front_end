
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SingleMarkerPage from './pages/SingleMarkerPage';
import MultiMarkerPage from './pages/MultiMarkerPage';
import SearchTypePage from './pages/SearchTypePage';
import WorkListPage from './pages/WorkListPage';
import WorkDetailPage from './pages/WorkDetailPage';
// import SeasonPlacesPage from './pages/SeasonPlacesPage';
import SeasonEpisodesPage from './pages/SeasonEpisodesPage';
import SeasonDetailPage from './pages/SeasonDetailPage';  // 새로 추가한 시즌 상세 페이지



function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<WorkSelectionPage />} />*/}
        <Route path="/single-marker/:id" element={<SingleMarkerPage />} />
        <Route path="/multi-marker/" element={<MultiMarkerPage />} />
        <Route path="/multi-marker/:id" element={<MultiMarkerPage />} /> {/* 다중 마커 페이지로의 라우트 */}
        <Route path="/search" element={<SearchTypePage />} />
        <Route path="/work" element={<WorkListPage />} />
        <Route path="/" element={<WorkListPage />} />
        <Route path="/work/:workKey" element={<WorkDetailPage />} />
        <Route path="/work/:workKey/:seasonKey" element={<SeasonEpisodesPage />} />
        <Route path="/work/:workKey/season/:seasonKey/details" element={<SeasonDetailPage />} />



      </Routes>
    </Router>
  );
}

export default App;
