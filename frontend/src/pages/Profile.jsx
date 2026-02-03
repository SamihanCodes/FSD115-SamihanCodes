import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateProfile, changePassword } from "../api/users";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return <div className="container">Loading profile...</div>;
  }

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await updateProfile(profileForm);
      setUser(res.data); // update global auth state
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await changePassword(passwordForm);
      setMessage("Password changed successfully");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

      {/* PROFILE INFO */}
      <div className="card">
        <h3>Account Information</h3>

        <p><strong>Role:</strong> {user.role}</p>

        <form onSubmit={handleProfileUpdate}>
          <label>Name</label>
          <input
            value={profileForm.name}
            onChange={(e) =>
              setProfileForm({ ...profileForm, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            type="email"
            value={profileForm.email}
            onChange={(e) =>
              setProfileForm({ ...profileForm, email: e.target.value })
            }
          />

          <button style={{ marginTop: "10px" }}>
            Update Profile
          </button>
        </form>
      </div>

      {/* PASSWORD CHANGE */}
      <div className="card">
        <h3>Change Password</h3>

        <form onSubmit={handlePasswordChange}>
          <label>Current Password</label>
          <input
            type="password"
            value={passwordForm.oldPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, oldPassword: e.target.value })
            }
          />

          <label>New Password</label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
          />

          <button
            style={{
              marginTop: "10px",
              backgroundColor: "#16808D",
            }}
          >
            Change Password
          </button>
        </form>
      </div>

      {/* FEEDBACK */}
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Profile;
