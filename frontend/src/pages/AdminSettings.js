import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./AdminSettings.css";

function AdminSettings() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Hotel State
  const [hotel, setHotel] = useState({
    name: "The Taj Hotel",
    description: "Manage your luxury hotel",
    email: "admin@tajhotel.com",
    phone: "+1-800-000-0000",
    address: "Luxury Avenue, City",
    city: "New York",
    country: "USA",
  });

  // Rooms State
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    room_type: "",
    price: "",
    img: "",
    total_rooms: "",
    available_rooms: "",
  });
  const [editingRoom, setEditingRoom] = useState(null);

  // Restaurant State
  const [restaurant, setRestaurant] = useState({
    name: "Taj Restaurant",
    cuisine: "Fine Dining",
    hours: "7:00 AM - 11:00 PM",
    description: "Experience culinary excellence",
    phone: "+1-800-111-1111",
    email: "restaurant@tajhotel.com",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    img: "",
    rating: "",
    offer: "",
  });
  const [editingMenuItem, setEditingMenuItem] = useState(null);

  // Spa State
  const [spa, setSpa] = useState({
    name: "Taj Spa",
    description: "Relax and rejuvenate",
    services: "Massage, Facials, Body Treatments",
    hours: "8:00 AM - 10:00 PM",
    phone: "+1-800-222-2222",
    email: "spa@tajhotel.com",
  });
  const [spaServices, setSpaServices] = useState([]);
  const [newSpaService, setNewSpaService] = useState({
    name: "",
    price: "",
    duration: "",
    img: "",
    rating: "",
  });
  const [editingSpaService, setEditingSpaService] = useState(null);

  // Users State
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch Rooms
  useEffect(() => {
    fetchRooms();
    fetchUsers();
    fetchMenuItems();
    fetchSpaServices();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("/admin/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/restaurant/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const fetchSpaServices = async () => {
    try {
      const response = await axios.get("/spa/services");
      setSpaServices(response.data);
    } catch (error) {
      console.error("Error fetching spa services:", error);
    }
  };

  // ==================== HOTEL HANDLERS ====================
  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSaveHotel = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/hotel/settings", hotel);
      setMessage("Hotel information updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating hotel information");
      console.error(error);
    }
    setLoading(false);
  };

  // ==================== ROOMS HANDLERS ====================
  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/rooms/add", {
        room_type: newRoom.room_type,
        price: parseInt(newRoom.price),
        img: newRoom.img,
        total_rooms: parseInt(newRoom.total_rooms),
        available_rooms: parseInt(newRoom.available_rooms),
      });
      setMessage("Room added successfully!");
      setNewRoom({
        room_type: "",
        price: "",
        img: "",
        total_rooms: "",
        available_rooms: "",
      });
      fetchRooms();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error adding room";
      setMessage(errorMessage);
      console.error(error);
    }
    setLoading(false);
  };

  const handleUpdateRoom = async (id, updatedRoom) => {
    setLoading(true);
    try {
      await axios.put(`/admin/rooms/${id}`, updatedRoom);
      setMessage("Room updated successfully!");
      fetchRooms();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating room");
      console.error(error);
    }
    setLoading(false);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setNewRoom({
      room_type: room.room_type,
      price: room.price,
      img: room.img || "",
      total_rooms: room.total_rooms,
      available_rooms: room.available_rooms,
    });
  };

  const handleSaveEditRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/admin/rooms/${editingRoom.id}`, {
        room_type: newRoom.room_type,
        price: parseInt(newRoom.price),
        img: newRoom.img,
        total_rooms: parseInt(newRoom.total_rooms),
        available_rooms: parseInt(newRoom.available_rooms),
      });
      setMessage("Room updated successfully!");
      setEditingRoom(null);
      setNewRoom({
        room_type: "",
        price: "",
        img: "",
        total_rooms: "",
        available_rooms: "",
      });
      fetchRooms();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating room");
      console.error(error);
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
    setNewRoom({
      room_type: "",
      price: "",
      img: "",
      total_rooms: "",
      available_rooms: "",
    });
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setLoading(true);
      try {
        await axios.delete(`/admin/rooms/${id}`);
        setMessage("Room deleted successfully!");
        fetchRooms();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting room");
        console.error(error);
      }
      setLoading(false);
    }
  };

  // ==================== RESTAURANT HANDLERS ====================
  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSaveRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/restaurant/settings", restaurant);
      setMessage("Restaurant information updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating restaurant information");
      console.error(error);
    }
    setLoading(false);
  };

  // Menu Item Handlers
  const handleMenuItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/restaurant/menu/add", {
        name: newMenuItem.name,
        price: parseInt(newMenuItem.price),
        img: newMenuItem.img,
        rating: parseFloat(newMenuItem.rating),
        offer: parseInt(newMenuItem.offer),
      });
      setMessage("Menu item added successfully!");
      setNewMenuItem({
        name: "",
        price: "",
        img: "",
        rating: "",
        offer: "",
      });
      fetchMenuItems();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error adding menu item";
      setMessage(errorMessage);
      console.error(error);
    }
    setLoading(false);
  };

  const handleEditMenuItem = (item) => {
    setEditingMenuItem(item);
    setNewMenuItem({
      name: item.name,
      price: item.price,
      img: item.img,
      rating: item.rating,
      offer: item.offer,
    });
  };

  const handleSaveEditMenuItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/admin/restaurant/menu/${editingMenuItem.id}`, {
        name: newMenuItem.name,
        price: parseInt(newMenuItem.price),
        img: newMenuItem.img,
        rating: parseFloat(newMenuItem.rating),
        offer: parseInt(newMenuItem.offer),
      });
      setMessage("Menu item updated successfully!");
      setEditingMenuItem(null);
      setNewMenuItem({
        name: "",
        price: "",
        img: "",
        rating: "",
        offer: "",
      });
      fetchMenuItems();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating menu item");
      console.error(error);
    }
    setLoading(false);
  };

  const handleCancelEditMenuItem = () => {
    setEditingMenuItem(null);
    setNewMenuItem({
      name: "",
      price: "",
      img: "",
      rating: "",
      offer: "",
    });
  };

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setLoading(true);
      try {
        await axios.delete(`/admin/restaurant/menu/${id}`);
        setMessage("Menu item deleted successfully!");
        fetchMenuItems();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting menu item");
        console.error(error);
      }
      setLoading(false);
    }
  };

  // ==================== SPA HANDLERS ====================
  const handleSpaChange = (e) => {
    const { name, value } = e.target;
    setSpa({ ...spa, [name]: value });
  };

  const handleSaveSpa = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/spa/settings", spa);
      setMessage("Spa information updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating spa information");
      console.error(error);
    }
    setLoading(false);
  };

  // Spa Service Handlers
  const handleSpaServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpaService({ ...newSpaService, [name]: value });
  };

  const handleAddSpaService = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/admin/spa/services/add", {
        name: newSpaService.name,
        price: parseInt(newSpaService.price),
        duration: newSpaService.duration,
        img: newSpaService.img,
        rating: parseFloat(newSpaService.rating),
      });
      setMessage("Spa service added successfully!");
      setNewSpaService({
        name: "",
        price: "",
        duration: "",
        img: "",
        rating: "",
      });
      fetchSpaServices();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error adding spa service";
      setMessage(errorMessage);
      console.error(error);
    }
    setLoading(false);
  };

  const handleEditSpaService = (service) => {
    setEditingSpaService(service);
    setNewSpaService({
      name: service.name,
      price: service.price,
      duration: service.duration,
      img: service.img,
      rating: service.rating,
    });
  };

  const handleSaveEditSpaService = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/admin/spa/services/${editingSpaService.id}`, {
        name: newSpaService.name,
        price: parseInt(newSpaService.price),
        duration: newSpaService.duration,
        img: newSpaService.img,
        rating: parseFloat(newSpaService.rating),
      });
      setMessage("Spa service updated successfully!");
      setEditingSpaService(null);
      setNewSpaService({
        name: "",
        price: "",
        duration: "",
        img: "",
        rating: "",
      });
      fetchSpaServices();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating spa service");
      console.error(error);
    }
    setLoading(false);
  };

  const handleCancelEditSpaService = () => {
    setEditingSpaService(null);
    setNewSpaService({
      name: "",
      price: "",
      duration: "",
      img: "",
      rating: "",
    });
  };

  const handleDeleteSpaService = async (id) => {
    if (window.confirm("Are you sure you want to delete this spa service?")) {
      setLoading(true);
      try {
        await axios.delete(`/admin/spa/services/${id}`);
        setMessage("Spa service deleted successfully!");
        fetchSpaServices();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting spa service");
        console.error(error);
      }
      setLoading(false);
    }
  };

  // ==================== USER HANDLERS ====================
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      try {
        await axios.delete(`/admin/users/${userId}`);
        setMessage("User deleted successfully!");
        fetchUsers();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting user");
        console.error(error);
      }
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (userId, updatedUser) => {
    setLoading(true);
    try {
      await axios.put(`/admin/users/${userId}`, updatedUser);
      setMessage("User updated successfully!");
      setEditingUser(null);
      fetchUsers();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating user");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="admin-settings-container">
      {/* Message Alert */}
      {message && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === "hotel" ? "active" : ""}`}
          onClick={() => setActiveTab("hotel")}
        >
          🏨 Hotel Info
        </button>
        <button
          className={`tab-btn ${activeTab === "rooms" ? "active" : ""}`}
          onClick={() => setActiveTab("rooms")}
        >
          🛏️ Rooms
        </button>
        <button
          className={`tab-btn ${activeTab === "restaurant" ? "active" : ""}`}
          onClick={() => setActiveTab("restaurant")}
        >
          🍽️ Restaurant
        </button>
        <button
          className={`tab-btn ${activeTab === "spa" ? "active" : ""}`}
          onClick={() => setActiveTab("spa")}
        >
          💆 Spa
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👤 Users
        </button>
      </div>

      {/* ==================== HOTEL TAB ==================== */}
      {activeTab === "hotel" && (
        <div className="settings-panel">
          <h3>🏨 Hotel Information</h3>
          <form onSubmit={handleSaveHotel}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Hotel Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={hotel.name}
                    onChange={handleHotelChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={hotel.email}
                    onChange={handleHotelChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={hotel.phone}
                    onChange={handleHotelChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={hotel.city}
                    onChange={handleHotelChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={hotel.country}
                    onChange={handleHotelChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={hotel.address}
                    onChange={handleHotelChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={hotel.description}
                onChange={handleHotelChange}
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "💾 Save Hotel Info"}
            </button>
          </form>
        </div>
      )}

      {/* ==================== ROOMS TAB ==================== */}
      {activeTab === "rooms" && (
        <div className="settings-panel">
          <h3>🛏️ Rooms Management</h3>

          {/* Add/Edit Room Form */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">{editingRoom ? "✏️ Edit Room" : "➕ Add New Room"}</h5>
            </div>
            <div className="card-body">
              <form onSubmit={editingRoom ? handleSaveEditRoom : handleAddRoom}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Room Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="room_type"
                        placeholder="e.g., Deluxe, Suite, Standard"
                        value={newRoom.room_type}
                        onChange={handleRoomInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Price per Night ($)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="150"
                        value={newRoom.price}
                        onChange={handleRoomInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Room Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        name="img"
                        placeholder="https://example.com/room.jpg"
                        value={newRoom.img}
                        onChange={handleRoomInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Total Rooms</label>
                      <input
                        type="number"
                        className="form-control"
                        name="total_rooms"
                        placeholder="10"
                        value={newRoom.total_rooms}
                        onChange={handleRoomInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Available Rooms</label>
                      <input
                        type="number"
                        className="form-control"
                        name="available_rooms"
                        placeholder="10"
                        value={newRoom.available_rooms}
                        onChange={handleRoomInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : editingRoom ? "💾 Update Room" : "➕ Add Room"}
                  </button>
                  {editingRoom && (
                    <button
                      type="button"
                      className="btn btn-secondary btn-lg"
                      onClick={handleCancelEdit}
                    >
                      ❌ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Rooms List */}
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">📋 Existing Rooms</h5>
            </div>
            <div className="card-body">
              {rooms.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Total</th>
                        <th>Available</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room.id}>
                          <td>{room.id}</td>
                          <td>{room.room_type}</td>
                          <td>${room.price}</td>
                          <td>{room.img ? <a href={room.img} target="_blank" rel="noreferrer">View</a> : "-"}</td>
                          <td>{room.total_rooms}</td>
                          <td>{room.available_rooms}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleEditRoom(room)}
                                disabled={editingRoom !== null}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteRoom(room.id)}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted">No rooms found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== RESTAURANT TAB ==================== */}
      {activeTab === "restaurant" && (
        <div className="settings-panel">
          <h3>🍽️ Restaurant Information</h3>
          <form onSubmit={handleSaveRestaurant}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Restaurant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={restaurant.name}
                    onChange={handleRestaurantChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Cuisine Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cuisine"
                    value={restaurant.cuisine}
                    onChange={handleRestaurantChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Operating Hours</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hours"
                    placeholder="7:00 AM - 11:00 PM"
                    value={restaurant.hours}
                    onChange={handleRestaurantChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={restaurant.phone}
                    onChange={handleRestaurantChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={restaurant.email}
                onChange={handleRestaurantChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={restaurant.description}
                onChange={handleRestaurantChange}
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "💾 Save Restaurant Info"}
            </button>
          </form>

          {/* Menu Management Section */}
          <hr />
          <h4>🍽️ Menu Management</h4>

          {/* Add/Edit Menu Item Form */}
          <form onSubmit={editingMenuItem ? handleSaveEditMenuItem : handleAddMenuItem}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newMenuItem.name}
                    onChange={handleMenuItemInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={newMenuItem.price}
                    onChange={handleMenuItemInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="img"
                    value={newMenuItem.img}
                    onChange={handleMenuItemInputChange}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="form-control"
                    name="rating"
                    value={newMenuItem.rating}
                    onChange={handleMenuItemInputChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Offer (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="form-control"
                    name="offer"
                    value={newMenuItem.offer}
                    onChange={handleMenuItemInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : editingMenuItem ? "✏️ Update Item" : "➕ Add Item"}
              </button>
              {editingMenuItem && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelEditMenuItem}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Menu Items List */}
          <div className="mt-4">
            <h5>Current Menu Items</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Offer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.rating || "N/A"}</td>
                      <td>{item.offer || 0}%</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditMenuItem(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteMenuItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SPA TAB ==================== */}
      {activeTab === "spa" && (
        <div className="settings-panel">
          <h3>💆 Spa Information</h3>
          <form onSubmit={handleSaveSpa}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Spa Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={spa.name}
                    onChange={handleSpaChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={spa.email}
                    onChange={handleSpaChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Operating Hours</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hours"
                    placeholder="8:00 AM - 10:00 PM"
                    value={spa.hours}
                    onChange={handleSpaChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={spa.phone}
                    onChange={handleSpaChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Services</label>
              <input
                type="text"
                className="form-control"
                name="services"
                placeholder="e.g., Massage, Facials, Body Treatments"
                value={spa.services}
                onChange={handleSpaChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={spa.description}
                onChange={handleSpaChange}
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "💾 Save Spa Info"}
            </button>
          </form>

          {/* Spa Services Management Section */}
          <hr />
          <h4>💆 Spa Services Management</h4>

          {/* Add/Edit Spa Service Form */}
          <form onSubmit={editingSpaService ? handleSaveEditSpaService : handleAddSpaService}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newSpaService.name}
                    onChange={handleSpaServiceInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={newSpaService.price}
                    onChange={handleSpaServiceInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    name="duration"
                    value={newSpaService.duration}
                    onChange={handleSpaServiceInputChange}
                    placeholder="e.g., 60 min"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="img"
                    value={newSpaService.img}
                    onChange={handleSpaServiceInputChange}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="form-control"
                name="rating"
                value={newSpaService.rating}
                onChange={handleSpaServiceInputChange}
                style={{ maxWidth: '200px' }}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : editingSpaService ? "✏️ Update Service" : "➕ Add Service"}
              </button>
              {editingSpaService && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelEditSpaService}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Spa Services List */}
          <div className="mt-4">
            <h5>Current Spa Services</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Duration</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {spaServices.map((service) => (
                    <tr key={service.id}>
                      <td>{service.name}</td>
                      <td>₹{service.price}</td>
                      <td>{service.duration}</td>
                      <td>{service.rating || "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditSpaService(service)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteSpaService(service.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== USERS TAB ==================== */}
      {activeTab === "users" && (
        <div className="settings-panel">
          <h3>👤 Users Management</h3>
          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={user.username}
                            onBlur={(e) => {
                              const updatedUser = { ...user, username: e.target.value };
                              handleUpdateUser(user.id, updatedUser);
                            }}
                          />
                        ) : (
                          user.username
                        )}
                      </td>
                      <td>
                        {editingUser && editingUser.id === user.id ? (
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            defaultValue={user.email}
                            onBlur={(e) => {
                              const updatedUser = { ...user, email: e.target.value };
                              handleUpdateUser(user.id, updatedUser);
                            }}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          {editingUser && editingUser.id === user.id ? (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => setEditingUser(null)}
                            >
                              💾 Save
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => handleEditUser(user)}
                            >
                              ✏️ Edit
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No users found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
