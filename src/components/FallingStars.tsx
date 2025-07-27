import './falling-stars.css';

const starCount = 7;

export default function FallingStars() {
  return (
    <div className="lines">
      {[...Array(starCount)].map((_, index) => (
        <div key={index} className="line"></div>
      ))}
    </div>
  );
}
