// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import axios from 'axios';
// //
// // function WorkDetailPage() {
// //   const { workKey } = useParams();
// //   const [workInfo, setWorkInfo] = useState(null);
// //   const [seasons, setSeasons] = useState([]);
// //
// //   useEffect(() => {
// //     axios.get(`http://localhost:5000/api/work/${workKey}`)
// //       .then(response => {
// //         setWorkInfo(response.data.workInfo);
// //         setSeasons(response.data.seasons);
// //       })
// //       .catch(error => console.error('Error fetching work details:', error));
// //   }, [workKey]);
// //
// //   if (!workInfo) return <div>Loading...</div>;
// //
// //   return (
// //     <div>
// //       <h1>{workInfo.work_name}</h1>
// //       <img src={workInfo.poster} alt={workInfo.work_name} style={{maxWidth: '300px'}} />
// //       <p>{workInfo.description}</p>
// //       <p>방영 기간: {workInfo.start_date} ~ {workInfo.end_date}</p>
// //
// //       <h2>시즌 목록</h2>
// //       <ul>
// //         {seasons.map(season => (
// //           <li key={season.work_season}>
// //             <Link to={`/work/${workKey}/season/${season.work_season}`}>
// //               {season.work_season === 'pv' ? 'PV' : `시즌 ${season.work_season}`}
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// //
// // export default WorkDetailPage;
//
//
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function WorkDetailPage() {
//   const { workKey } = useParams();
//   const [workDetails, setWorkDetails] = useState(null);
//
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/work/${workKey}`)
//       .then(response => setWorkDetails(response.data))
//       .catch(error => console.error('Error fetching work details:', error));
//   }, [workKey]);
//
//   if (!workDetails) return <div>Loading...</div>;
//
//   return (
//     <div>
//       <h1>{workDetails.work.work_name}</h1>
//       <img src={workDetails.work.poster} alt={workDetails.work.work_name} style={{maxWidth: '300px'}} />
//       <p>{workDetails.work.description}</p>
//       <h2>시즌 목록</h2>
//       <ul>
//         {workDetails.seasons.map(season => (
//           <li key={season.season_key}>
//             <Link to={`/work/${workKey}/season/${season.season_key}`}>
//               {season.season === 'movie' ? '극장판' : `${season.season}기`}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// // export default WorkDetailPage;
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function WorkDetailPage() {
//   const { workKey } = useParams();
//   const [workDetails, setWorkDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`http://localhost:5000/api/work/${workKey}/1`)  // 첫 번째 시즌의 정보를 가져옵니다.
//       .then(response => {
//         console.log('API Response:', response.data);
//         if (Array.isArray(response.data) && response.data.length > 0) {
//           setWorkDetails(response.data[0]);  // 첫 번째 에피소드의 정보를 사용합니다.
//         } else {
//           setError('작품 정보를 찾을 수 없습니다.');
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching work details:', error);
//         setError('작품 정보를 가져오는 데 실패했습니다.');
//         setLoading(false);
//       });
//   }, [workKey]);
//
//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>에러: {error}</div>;
//   if (!workDetails) return <div>작품 정보를 찾을 수 없습니다.</div>;
//
//   return (
//     <div>
//       <h1>{workDetails.work_name}</h1>
//       {workDetails.poster && (
//         <img
//           src={workDetails.poster}
//           alt={workDetails.work_name}
//           style={{maxWidth: '300px'}}
//         />
//       )}
//       <p>{workDetails.description || '설명이 없습니다.'}</p>
//       <p>방영 기간: {workDetails.start_date} ~ {workDetails.end_date}</p>
//       <h2>시즌</h2>
//       <ul>
//         <li>
//           <Link to={`/work/${workKey}/season/1`}>1기</Link>
//         </li>
//         {/* 다른 시즌에 대한 링크도 여기에 추가할 수 있습니다. */}
//       </ul>
//     </div>
//   );
// }
//
// export default WorkDetailPage;

// 클로드
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function WorkDetailPage() {
//   const { workKey } = useParams();
//   const [workDetails, setWorkDetails] = useState(null);
//   const [seasons, setSeasons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     setLoading(true);
//     Promise.all([
//       axios.get(`http://localhost:5000/api/work/${workKey}/1`),
//       axios.get(`http://localhost:5000/api/work/${workKey}/seasons`)
//     ])
//       .then(([detailsResponse, seasonsResponse]) => {
//         console.log('API Responses:', detailsResponse.data, seasonsResponse.data);
//         if (Array.isArray(detailsResponse.data) && detailsResponse.data.length > 0) {
//           setWorkDetails(detailsResponse.data[0]);
//         } else {
//           setError('작품 정보를 찾을 수 없습니다.');
//         }
//         if (Array.isArray(seasonsResponse.data)) {
//           setSeasons(seasonsResponse.data);
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching work details:', error);
//         setError('작품 정보를 가져오는 데 실패했습니다.');
//         setLoading(false);
//       });
//   }, [workKey]);
//
//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>에러: {error}</div>;
//   if (!workDetails) return <div>작품 정보를 찾을 수 없습니다.</div>;
//
//   return (
//     <div>
//       <h1>{workDetails.work_name}</h1>
//       {workDetails.poster && (
//         <img
//           src={workDetails.poster}
//           alt={workDetails.work_name}
//           style={{maxWidth: '300px'}}
//         />
//       )}
//       <p>{workDetails.description || '설명이 없습니다.'}</p>
//       <p>방영 기간: {workDetails.start_date} ~ {workDetails.end_date}</p>
//       <h2>시즌</h2>
//       <ul>
//         {seasons.map(season => (
//           <li key={season.season_key}>
//             <Link to={`/work/${workKey}/season/${season.season_key}`}>
//               {season.display_name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default WorkDetailPage;
//
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function WorkDetailPage() {
//   const { workKey } = useParams();
//   const [workDetails, setWorkDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`http://localhost:5000/api/work/${workKey}`)
//       .then(response => {
//         console.log('API 응답 데이터:', response.data); // API 응답 데이터 확인
//         setWorkDetails(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching work details:', error);
//         setError('작품 정보를 가져오는 데 실패했습니다.');
//         setLoading(false);
//       });
//   }, [workKey]);
//
//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>에러: {error}</div>;
//
//   // workDetails 또는 workDetails.work이 없는 경우 처리
//   if (!workDetails || !workDetails.work) {
//     return <div>작품 정보를 찾을 수 없습니다.</div>;
//   }
//
//   return (
//     <div>
//       <h1>{workDetails.work.work_name}</h1>
//       {workDetails.work.poster && (
//         <img
//           src={workDetails.work.poster}
//           alt={workDetails.work.work_name}
//           style={{ maxWidth: '300px' }}
//         />
//       )}
//       <p>{workDetails.work.description || '설명이 없습니다.'}</p>
//       <p>방영 기간: {workDetails.work.start_date} ~ {workDetails.work.end_date}</p>
//       <h2>시즌 목록</h2>
//       <ul>
//         {workDetails.seasons.map(season => (
//           <li key={season.season_key}>
//             <Link to={`/work/${workKey}/season/${season.season_key}`}>
//               {season.display_name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default WorkDetailPage;

//
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function WorkDetailPage() {
//   const { workKey } = useParams();
//   const [workDetails, setWorkDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`http://localhost:5000/api/work/${workKey}`)
//       .then(response => {
//         console.log('API 응답 데이터:', response.data);
//         setWorkDetails(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching work details:', error);
//         setError('작품 정보를 가져오는 데 실패했습니다.');
//         setLoading(false);
//       });
//   }, [workKey]);
//
//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>에러: {error}</div>;
//   if (!workDetails) return <div>작품 정보를 찾을 수 없습니다.</div>;
//
//   return (
//     <div>
//       <h1>{workDetails.work.work_name}</h1>
//       {workDetails.work.poster && (
//         <img
//           src={workDetails.work.poster}
//           alt={workDetails.work.work_name}
//           style={{ maxWidth: '300px' }}
//         />
//       )}
//       <p>{workDetails.work.description || '설명이 없습니다.'}</p>
//       <p>방영 기간: {workDetails.work.start_date} ~ {workDetails.work.end_date}</p>
//       <h2>시즌 목록</h2>
//       <ul>
//         {workDetails.seasons.map(season => (
//           <li key={season.season_key}>
//             <Link to={`/work/${workKey}/season/${season.season_key}/details`}>
//               {season.display_name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default WorkDetailPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function WorkDetailPage() {
  const { workKey } = useParams();  // URL에서 workKey를 가져옵니다.
  const [workDetails, setWorkDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/work/${workKey}`)
      .then(response => {
        console.log('API 응답 데이터:', response.data);  // API 응답 데이터 확인
        setWorkDetails(response.data);  // 가져온 데이터를 상태로 설정
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching work details:', error);
        setError('작품 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [workKey]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!workDetails) return <div>작품 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      {/*<h1>{workDetails.work.work_name}</h1>  /!* 작품 이름을 표시합니다. *!/*/}
      {/*{workDetails.work.poster && (*/}
      {/*  <img*/}
      {/*    src={workDetails.work.poster}*/}
      {/*    alt={workDetails.work.work_name}*/}
      {/*    style={{ maxWidth: '300px' }}  // 이미지 스타일을 설정합니다.*/}
      {/*  />*/}
      {/*)}*/}
      {/*<p>{workDetails.work.description || '설명이 없습니다.'}</p>  /!* 작품 설명을 표시합니다. *!/*/}
      {/*<p>방영 기간: {workDetails.work.start_date} ~ {workDetails.work.end_date}</p>  /!* 방영 기간을 표시합니다. *!/*/}
      <h2>시즌 목록</h2>
      <ul>
        {workDetails.seasons.map(season => (
          <li key={season.season_key}>
            {/* 시즌 클릭 시 해당 시즌의 세부 정보 페이지로 이동합니다. */}
            <Link to={`/work/${workKey}/season/${season.season_key}/details`}>
              {season.display_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkDetailPage;
