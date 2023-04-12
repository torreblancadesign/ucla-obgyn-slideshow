import React, { useEffect, useState } from 'react';
import fetchData from '../scripts/slideshow';

const IndexPage = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideTimer, setSlideTimer] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % slides.length);
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [slides, currentSlide]);

  useEffect(() => {
    if (slides.length > 0) {
      setSlideTimer(60);
      const timer = setInterval(() => {
        setSlideTimer((prev) => (prev === 1 ? 60 : prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [slides, currentSlide]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide${index === currentSlide ? ' active' : ''}`}
        >
          <h2 className="slide-title">{slide.fields.Topic}</h2>
          <div
            className="slide-content"
            dangerouslySetInnerHTML={{ __html: slide.fields.Content }}
          ></div>
        </div>
      ))}
      <div className="timer">{slideTimer}s</div>
    </div>
  );
};

export default IndexPage;
