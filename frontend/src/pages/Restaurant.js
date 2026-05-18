import React, { useState, useEffect, useCallback } from "react";
import "./restaurant.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import RestaurantReviews from "../components/RestaurantReviews";

const defaultMenu = [
  { id: 1, name: "Margherita Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40, category: "Italian", description: "Fresh mozzarella, tomato sauce, basil" },
  { id: 2, name: "Creamy Alfredo Pasta", price: 349, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20, category: "Italian", description: "Fettuccine in rich cream sauce with parmesan" },
  { id: 3, name: "Lasagna", price: 399, img: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3", rating: 4.7, offer: 25, category: "Italian", description: "Layered pasta with meat sauce and cheese" },
  { id: 4, name: "Classic Cheeseburger", price: 249, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25, category: "American", description: "Beef patty with cheese, lettuce, tomato" },
  { id: 5, name: "BBQ Ribs", price: 499, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d", rating: 4.8, offer: 30, category: "American", description: "Slow-cooked pork ribs with BBQ sauce" },
  { id: 6, name: "Chicken Wings", price: 299, img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f", rating: 4.4, offer: 35, category: "American", description: "Crispy wings with choice of sauce" },
  
  { id: 11, name: "Vegetable Fried Rice", price: 199, img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b", rating: 4.3, offer: 15, category: "Chinese", description: "Wok-tossed rice with fresh vegetables" },
  { id: 12, name: "Kung Pao Chicken", price: 359, img: "https://images.unsplash.com/photo-1529042410759-befb1204b468", rating: 4.6, offer: 25, category: "Chinese", description: "Spicy stir-fry with peanuts and vegetables" },
  { id: 13, name: "Chocolate Lava Cake", price: 199, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587", rating: 4.9, offer: 40, category: "Dessert", description: "Warm chocolate cake with molten center" },
  { id: 14, name: "Tiramisu", price: 229, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", rating: 4.8, offer: 30, category: "Dessert", description: "Classic Italian dessert with coffee and mascarpone" },
  { id: 15, name: "Cheesecake", price: 179, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad", rating: 4.7, offer: 20, category: "Dessert", description: "Creamy cheesecake with berry topping" },
  { id: 16, name: "Cold Brew Coffee", price: 149, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15, category: "Beverage", description: "Smooth, cold-brewed coffee" },
  { id: 17, name: "Fresh Orange Juice", price: 129, img: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8", rating: 4.5, offer: 20, category: "Beverage", description: "Freshly squeezed orange juice" },
  { id: 18, name: "Green Tea", price: 99, img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574", rating: 4.4, offer: 10, category: "Beverage", description: "Traditional Japanese green tea" }
];

function Restaurant() {

  const navigate = useNavigate();

  const [menu, setMenu] = useState(defaultMenu);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reviewsModalItem, setReviewsModalItem] = useState(null);

  const handleOpenReviews = (item) => {
    setReviewsModalItem(item);
  };

  const handleCloseReviews = () => {
    setReviewsModalItem(null);
    fetchMenu();
  };

  const mergeMenu = (apiMenu) => {
    if (!apiMenu?.length) return defaultMenu;
    const menuMap = new Map(apiMenu.map((item) => [item.name, item]));
    const merged = [...apiMenu];
    defaultMenu.forEach((defaultItem) => {
      if (!menuMap.has(defaultItem.name)) {
        merged.push(defaultItem);
      }
    });
    return merged;
  };

  const fetchMenu = useCallback(async () => {
    try {
      const response = await axios.get("/restaurant/menu");
      setMenu(mergeMenu(response.data));
    } catch (error) {
      console.error("Error fetching menu:", error);
      setMenu(defaultMenu);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
    setWishlist(saved);
    fetchMenu();
  }, [fetchMenu]);

  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(menu.map(item => item.category))];

  const addWishlist = (item) => {
    const updated = [...wishlist, item];
    setWishlist(updated);
    localStorage.setItem("foodWishlist", JSON.stringify(updated));
    Swal.fire("Added ❤️", item.name, "success");
  };

  const handleOrder = (item) => {
    navigate("/food-payment", {
      state: { order: item }
    });
  };

  if (loading) {
    return (
      <div className="restaurant-page">
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-page">

      {/* HERO */}
      <div className="hero-img">
        <div className="overlay">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Luxury Dining Experience 🍽️
          </motion.h1>

          <p className="hero-subtitle">
            Taste the finest dishes crafted by expert chefs
          </p>

          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search food..."
              className="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* FOOD GRID */}
      <div className="container mt-5">
        <div className="row">

          {filteredMenu.map((item, i) => {

            const finalPrice = Math.round(
              item.price - (item.price * (item.offer || 0)) / 100
            );

            return (
              <motion.div
                className="col-md-4 mb-4"
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
              >

                <div className="food-card">

                  <span className="offer-badge">{item.offer || 0}% OFF</span>

                  <span
                    className="wishlist"
                    onClick={() => addWishlist(item)}
                  >
                    ❤️
                  </span>

                  <img src={item.img || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b"} alt={item.name} />

                  <div className="card-body text-center">
                    <h5>{item.name}</h5>
                    <div className="food-category mb-1">
                      <span className="badge badge-primary">{item.category}</span>
                    </div>
                    <p className="food-description small text-muted mb-2">{item.description}</p>
                    <div 
                      className="rating" 
                      style={{cursor: 'pointer'}}
                      onClick={() => handleOpenReviews(item)}
                      title="Click to view or add reviews"
                    >
                      {"★".repeat(Math.floor(item.average_rating || item.rating || 4))}
                      <span className="rating-text ml-1">
                        ({item.average_rating ? Number(item.average_rating).toFixed(1) : item.rating || 4})
                        {item.review_count > 0 && (
                          <small className="ms-1 text-muted">
                            ({item.review_count} {item.review_count === 1 ? "review" : "reviews"})
                          </small>
                        )}
                      </span>
                    </div>
                    <p className="price">
                      ₹{finalPrice}
                      {item.offer > 0 && <span className="original-price">₹{item.price}</span>}
                    </p>
                    <button
                      className="order-btn"
                      onClick={() => handleOrder(item)}
                    >
                      Order Now
                    </button>
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>

      {/* REVIEWS MODAL */}
      {reviewsModalItem && (
        <RestaurantReviews
          restaurantId={reviewsModalItem.id}
          itemName={reviewsModalItem.name}
          onClose={handleCloseReviews}
          onReviewAdded={fetchMenu}
        />
      )}

    </div>
  );
}

export default Restaurant;