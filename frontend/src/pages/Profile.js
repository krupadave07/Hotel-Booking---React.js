import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Profile.css";

const API_URL = "http://localhost:5000/api/auth";

function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [form, setForm] = useState({ username: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const avatarUrl = useMemo(() => {
    if (photoPreview) {
      return photoPreview;
    }
    const nameForAvatar = form.username || profile.name || "User";
    return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(nameForAvatar)}.svg`;
  }, [photoPreview, form.username, profile.name]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!res.ok) {
          const message = data.message || `Unable to load profile (${res.status})`;
          Swal.fire("Error ❌", message, "error");
          return;
        }

        setProfile(data.user);
        setForm((prev) => ({ ...prev, username: data.user.name }));
      } catch (err) {
        console.error("Profile fetch error:", err);
        Swal.fire("Server error ❌", "Unable to fetch profile. Check backend server and auth token.", "error");
      }
    };

    fetchProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    if (!form.username.trim()) {
      Swal.fire("Validation error", "Name cannot be empty.", "warning");
      return false;
    }

    if (form.newPassword && form.newPassword.length < 5) {
      Swal.fire("Validation error", "New password must be at least 5 characters.", "warning");
      return false;
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      Swal.fire("Validation error", "Password confirmation does not match.", "warning");
      return false;
    }

    if (form.newPassword && !form.currentPassword) {
      Swal.fire("Validation error", "Current password is required to change your password.", "warning");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: form.username.trim(),
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        Swal.fire("Error ❌", data.message || `Update failed (${res.status})`, "error");
        setLoading(false);
        return;
      }

      const updatedUser = {
        ...profile,
        name: data.user.name,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setProfile(updatedUser);
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));

      Swal.fire("Saved ✅", data.message || "Profile updated successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Server error ❌", "Unable to update profile.", "error");
    }

    setLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-box">
            <img className="profile-avatar" src={avatarUrl} alt="Profile" />
            <label htmlFor="photo-upload" className="photo-label">
              Change photo
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <div>
            <h2>Profile Settings</h2>
            <p>Update your name, change password, and manage your account.</p>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={profile.email} disabled />
          </div>

          <div className="divider" />

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" disabled={loading} className="save-button">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
