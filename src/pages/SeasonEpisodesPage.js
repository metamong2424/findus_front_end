// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function SeasonEpisodesPage() {
//   const { workKey, seasonKey } = useParams();
//   const [episodes, setEpisodes] = useState([]);
//
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/work/${workKey}/${seasonKey}`)
//       .then(response => setEpisodes(response.data))
//       .catch(error => console.error('Error fetching episodes:', error));
//   }, [workKey, seasonKey]);
//
//   return (
//     <div>
//       <h1>{workKey} - 시즌 {seasonKey}</h1>
//       <ul>
//         {episodes.map(episode => (
//           <li key={episode.work_ep}>
//             <Link to={`/work/${workKey}/season/${seasonKey}/episode/${episode.work_ep}`}>
//               에피소드 {episode.work_ep}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default SeasonEpisodesPage;
//
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
//
// function SeasonEpisodesPage() {
//   const { workKey, seasonKey } = useParams();
//   const [episodes, setEpisodes] = useState([]);
//
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/work/${workKey}/${seasonKey}`)
//       .then(response => setEpisodes(response.data))
//       .catch(error => console.error('Error fetching episodes:', error));
//   }, [workKey, seasonKey]);
//
//   return (
//     <div>
//       <h1>{workKey} - {seasonKey === 'movie' ? '극장판' : `${seasonKey}기`}</h1>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
//         {episodes.map(episode => (
//           <div key={episode.work_ep}>
//             <img src={episode.thumbnail} alt={`Episode ${episode.work_ep}`} style={{width: '100%', height: 'auto'}} />
//             <p>에피소드 {episode.work_ep}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
//
// export default SeasonEpisodesPage;



import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function SeasonEpisodesPage() {
  const { workKey, seasonKey } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/work/${workKey}/${seasonKey}`)
      .then(response => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setEpisodes(response.data);
        } else {
          setError('에피소드 정보를 찾을 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
        setError('에피소드 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
      });
  }, [workKey, seasonKey]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (episodes.length === 0) return <div>에피소드 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h1>{episodes[0].work_name} - {seasonKey}기</h1>
      <ul>
        {episodes.map(episode => (
          <li key={episode.work_id}>
            <h3>에피소드 {episode.work_ep}</h3>
            <img src={episode.poster} alt={`에피소드 ${episode.work_ep}`} style={{maxWidth: '200px'}} />
            <p>{episode.description}</p>
          </li>
        ))}
      </ul>
      <Link to={`/work/${workKey}`}>작품 정보로 돌아가기</Link>
    </div>
  );
}

export default SeasonEpisodesPage;