import React, { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import "./RoomReviews.css";

function RoomReviews({ roomId, roomType, onClose, onReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 5,
    reviewText: ""
  });

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/reviews/${roomId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.userName.trim()) {
      Swal.fire("Missing Name", "Please enter your name.", "warning");
      return;
    }

    try {
      await axios.post("/reviews", {
        roomId,
        ...newReview
      });
      Swal.fire("Success", "Review added successfully!", "success");
      setNewReview({ userName: "", rating: 5, reviewText: "" });
      fetchReviews();
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error("Error adding review:", error);
      Swal.fire("Error", "Failed to submit review.", "error");
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="reviews-modal-overlay">
      <div className="reviews-modal">
        <div className="reviews-modal-header">
          <h4>Reviews for {roomType}</h4>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="reviews-modal-body">
          <div className="reviews-list">
            {loading ? (
              <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <strong>{review.user_name}</strong>
                    <span className="review-stars">{renderStars(review.rating)}</span>
                  </div>
                  <small className="text-muted">
                    {new Date(review.created_at).toLocaleDateString()}
                  </small>
                  <p className="mt-2 mb-0">{review.review_text}</p>
                </div>
              ))
            )}
          </div>

          <hr />

          <div className="add-review-form">
            <h5>Leave a Review</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Your Name"
                  value={newReview.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="me-2">Rating:</label>
                <select
                  className="form-select w-auto d-inline-block"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleInputChange}
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  name="reviewText"
                  placeholder="Tell us about your experience..."
                  rows="3"
                  value={newReview.reviewText}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomReviews;
