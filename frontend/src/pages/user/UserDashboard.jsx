import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import axios from 'axios';

// simple demo videos data; replace src with your api results when backend is ready

const demoVideos = [
   {
      id: 1,
      url: 'https://example.com/video1.mp4',
      description: 'Delicious homemade pizza with fresh toppings and crispy crust. Made with love in our traditional wood-fired oven.',
      storeLink: '/store/1'
    },
    {
      id: 2,
      url: 'https://example.com/video2.mp4',
      description: 'Authentic Thai curry with aromatic spices and fresh vegetables. Experience the true taste of Thailand.',
      storeLink: '/store/2'
    }
]

function UserDashboard() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // store refs to each video element by id
  const videoRefs = useRef({});

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Fetch videos from backend API (run once)
    axios
      .get('http://localhost:3000/api/food', { withCredentials: true })
      .then((response) => {
        console.log('API Response:', response.data); // Debug log
        
        // Ensure we have an array of videos. Backend returns different shapes
        // - { food: [...] }  (current backend)
        // - { foodItems: [...] }
        // - [...] (direct array)
        let items = [];
        if (Array.isArray(response.data)) {
          items = response.data;
        } else if (Array.isArray(response.data?.food)) {
          items = response.data.food;
        } else if (Array.isArray(response.data?.foodItems)) {
          items = response.data.foodItems;
        } else if (Array.isArray(response.data?.data)) {
          // sometimes wrapped again
          items = response.data.data;
        }
        
        if (items.length === 0) {
          setError('No videos available');
        }
        
        setVideos(items);
      })
      .catch((err) => {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load videos');
        setVideos([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    const observers = {};
    
    videos.forEach((video) => {
      const vidId = video._id ?? video.id;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.play();
            } else {
              entry.target.pause();
            }
          });
        },
        { threshold: 0.6 } // Video will play when 60% visible
      );

      const el = videoRefs.current[vidId];
      if (el) {
        observer.observe(el);
        observers[vidId] = observer;
      }
    });

    // Cleanup observers
    return () => {
      Object.values(observers).forEach(observer => {
        observer.disconnect();
      });
    };
  }, [videos]);

  if (isLoading) {


    return (
      <div className="mobile-frame">
        <div className="mobile-device">
          <div className="video-feed-container">
            <div className="loading">Loading videos...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mobile-frame">
        <div className="mobile-device">
          <div className="video-feed-container">
            <div className="error">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      <div className="mobile-device">
        <div className="video-feed-container">
          {Array.isArray(videos) && videos.map((item) => (
            <div key={item._id} className="video-feed-item">
              <video
                ref={el => videoRefs.current[item._id] = el}
                src={item.video}
                loop
                muted
                playsInline
                className="video-element"
              />
              <div className="video-content-overlay">
                <p className="video-content-description">{item.description}</p>
                <Link to={ "/food-partner/" + item.foodPartner}>
                  <button className="store-visit-button">Visit Store</button>
                </Link>
              </div>
            </div>
          ))}
          {Array.isArray(videos) && videos.length === 0 && !error && (
            <div className="no-videos">No videos available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;