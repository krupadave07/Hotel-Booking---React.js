import React, { useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const addReview = () => {
    const newReview = { text, rating };
    setReviews([...reviews, newReview]);
    setText("");
  };

  return (
    <div className="container py-5">
      <h2>⭐ Reviews</h2>

      <textarea
        className="form-control mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write review..."
      />

      <select onChange={(e) => setRating(e.target.value)}>
        {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
      </select>

      <button className="btn btn-primary mt-2" onClick={addReview}>
        Submit
      </button>

      <div className="mt-4">
        {reviews.map((r,i)=>(
          <div key={i}>
            ⭐ {r.rating} - {r.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;