import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeItem = (index) => {
    const updated = [...wishlist];
    updated.splice(index, 1);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const bookNow = (room) => {
    navigate("/payment", { state: room });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">❤️ Your Wishlist</h2>

      <div className="row">
        {wishlist.map((room, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card wishlist-card">

              <img src={room.image} className="card-img-top" alt="" />

              <div className="card-body text-center">
                <h5>{room.name}</h5>
                <p>₹{room.price}</p>

                <button
                  className="btn btn-danger me-2"
                  onClick={() => removeItem(i)}
                >
                  Remove
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => bookNow(room)}
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;