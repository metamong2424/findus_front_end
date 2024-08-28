// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
//
// function WorkListPage() {
//   const [works, setWorks] = useState([]);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/work/all')
//       .then(response => {
//         console.log('API response:', response.data);  // 응답 데이터 로깅
//         setWorks(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching works:', error);
//         setError('작품 목록을 불러오는 데 실패했습니다.');
//       });
//   }, []);
//
//   if (error) return <div>Error: {error}</div>;
//
//   return (
//     <div>
//       <h1>작품 목록</h1>
//       {works.length === 0 ? (
//         <p>로딩 중...</p>
//       ) : (
//         <ul>
//           {works.map(work => (
//             <li key={work.work_name}>
//               <Link to={`/work/${work.work_name}`}>{work.work_name}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
//
// export default WorkListPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function WorkListPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/work/all')
      .then(response => setWorks(response.data))
      .catch(error => console.error('Error fetching works:', error));
  }, []);

  return (
    <div>
      <h1>작품 목록</h1>
      <ul>
        {works.map(work => (
          <li key={work.work_key}>
            <Link to={`/work/${work.work_key}`}>{work.work_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkListPage;