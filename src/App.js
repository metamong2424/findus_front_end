import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleMarkerPage from "./pages/SingleMarkerPage";
import MultiMarkerPage from "./pages/MultiMarkerPage";
import SearchTypePage from "./pages/SearchTypePage";
import WorkListPage from "./pages/WorkListPage";
import WorkDetailPage from "./pages/WorkDetailPage";
// import SeasonPlacesPage from './pages/SeasonPlacesPage';
import SeasonEpisodesPage from "./pages/SeasonEpisodesPage";
import SeasonDetailPage from "./pages/SeasonDetailPage"; // 새로 추가한 시즌 상세 페이지
import Dashboard from "./pages/Dashboard";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  useEffect(() => {
    // URL에서 쿼리 파라미터를 통해 전달된 토큰을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // 토큰이 있으면 로컬 스토리지에 저장
      localStorage.setItem("token", token);

      // 브라우저 히스토리에서 URL의 쿼리 파라미터 제거 (깨끗한 URL 유지)
      window.history.replaceState({}, document.title, "/");

      // 토큰이 저장되었으므로 대시보드 페이지로 리디렉션
      window.location.href = "/dashboard";
    }
  }, []); // 컴포넌트가 마운트될 때만 실행

  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<WorkSelectionPage />} />*/}
        <Route path="/single-marker/:id" element={<SingleMarkerPage />} />
        <Route path="/multi-marker/" element={<MultiMarkerPage />} />
        <Route path="/multi-marker/:id" element={<MultiMarkerPage />} />{" "}
        {/* 다중 마커 페이지로의 라우트 */}
        <Route path="/search" element={<SearchTypePage />} />
        <Route path="/work" element={<WorkListPage />} />
        <Route
          path="/"
          element={
            <div>
              <h1>Google Login Example</h1>
              <LoginButton /> {/* 로그인 버튼 표시 */}
              <LogoutButton /> {/* 로그아웃 버튼 표시 */}
            </div>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work/:workKey" element={<WorkDetailPage />} />
        <Route
          path="/work/:workKey/:seasonKey"
          element={<SeasonEpisodesPage />}
        />
        <Route
          path="/work/:workKey/season/:seasonKey/details"
          element={<SeasonDetailPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
