import { useState } from "react";

const Carousel = ({ images }) => {
  const carouselContainerStyle = {
    overflow: "hidden",
    width: "75%",
    margin: "auto",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  };

  const carouselInnerStyle = {
    display: "flex",
    transition: "transform 0.5s ease",
    position: "relative",
    width: "100%",
  };

  const imgStyle = {
    minWidth: "100%",
    height: "auto",
    flexShrink: 0,
  };



  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((current) => (current + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  };

  const getTransform = () => {
    const percentage = -(index * 100);
    return `translateX(${percentage}%)`;
  };

  return (
    <section style={carouselContainerStyle}>
      <button onClick={handlePrev} style={{
        position: "absolute",
        left: "0",
        width: "2rem",
        height: "3rem",
        fontSize: "2rem",
        zIndex: 1,
      }}>
        ⬅️
      </button>
      <div style={{...carouselInnerStyle, transform: getTransform()}}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`carousel-${i}`} style={imgStyle} />
        ))}
      </div>
      <button onClick={handleNext} style={{
        position: "absolute",
        width: "2rem",
        height: "3rem",
        fontSize: "2rem",
        zIndex: 1,
        right: "12px",
      }}>
        ➡️
      </button>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        position: "absolute",
        bottom: "0",
        width: "100%",
        padding: "1rem",
      }}>
        {images.map((_, i) => (
          <span key={i} style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            backgroundColor: i === index ? "black" : "white",
            cursor: "pointer",
            margin: "0.5rem",
          }} onClick={() => setIndex(i)}></span>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
