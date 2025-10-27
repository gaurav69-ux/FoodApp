import React, { useEffect, useState } from 'react';
import './FoodPartnerDashboard.css';
import axios from 'axios';

function FoodPartnerDashboard() {
  const [partner, setPartner] = useState({
    avatar: '',
    restaurantName: 'Your Restaurant',
    address: address,
    served: 0
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to fetch food partner's uploaded items from backend. The backend currently
    // exposes GET /api/food which returns all food items. Ideally the backend should
    // provide a protected endpoint returning only the logged-in partner's items.
    // We'll attempt to fetch /api/food and use returned items as uploaded videos.

    setLoading(true);
    axios.get('http://localhost:3000/api/food', { withCredentials: true })
      .then(res => {
        // backend returns { message, food } (see backend controller). Accept several shapes.
        const data = res?.data;
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.food)) items = data.food;
        else if (Array.isArray(data.foodItems)) items = data.foodItems;

        setVideos(items);

        // If backend provides partner info (not implemented yet), use it. Otherwise keep defaults.
        // Example response shape after login might include foodPartner data in cookies/session.
        // For now compute stats from items.
        const totalItems = items.length;
        const served = items.reduce((sum, it) => sum + (it.servedCount || 0), 0);
        setPartner(p => ({ ...p, restaurantName: p.restaurantName, address: p.address, served, totalItems }));
      })
      .catch(err => {
        console.warn('Could not fetch partner videos:', err?.message || err);
        setError('Could not load uploaded videos.');
      })
      .finally(() => setLoading(false));
  }, []);

  const sampleAvatar = 'https://via.placeholder.com/300?text=Avatar';

  return (
    <div className="fp-dashboard">
      <div className="fp-header">
        <img className="fp-avatar" src={partner.avatar || sampleAvatar} alt="avatar" />
        <div className="fp-info">
          <h3 className="fp-name">{partner.restaurantName}</h3>
          <p className="fp-address">{partner.address}</p>
          <div className="fp-stats">
            <div className="stat">
              <div className="v">{partner.served ?? 0}</div>
              <div className="k">Served</div>
            </div>
            <div className="stat">
              <div className="v">{videos?.length ?? 0}</div>
              <div className="k">Total items</div>
            </div>
          </div>
        </div>
      </div>

      <h4 className="section-title">Uploaded Videos</h4>

      {loading && <div>Loading videos...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && !error && (
        <div className="videos-grid">
          {videos.length === 0 && (
            <div style={{ color: '#666' }}>No videos uploaded yet.</div>
          )}

          {videos.map((v) => (
            <div className="video-card" key={v._id || v.id}>
              {/* Use the stored `video` field from backend (URL) */}
              <video className="video-thumb" src={v.video} muted controls={false} preload="metadata" />
              <div className="video-meta">
                <div className="video-title">{v.name || v.description || 'Untitled'}</div>
                <div className="video-sub">{v.description ? v.description.substring(0, 60) : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodPartnerDashboard;