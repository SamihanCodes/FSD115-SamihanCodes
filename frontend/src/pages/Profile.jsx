import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateProfile, changePassword } from "../api/users";
import Footer from "../components/Footer";
import "./Profile.css";

const Profile = () => {
  const { user, updateUser } = useAuth();

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

  if (!user) return <div className="profile-page">Loading...</div>;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await updateProfile(profileForm);
      updateUser(res.data);
      setMessage("Profile updated successfully");
    } catch {
      setError("Profile update failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await changePassword(passwordForm);
      setMessage("Password changed successfully");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch {
      setError("Password change failed");
    }
  };

  return (
    <>
      <div className="profile-page">
        {/* NEW PATTERN BACKGROUND */}
        <div className="pattern-bg" />

        <div className="glass-container">
          <h1 className="page-heading">
            My Profile <span>👤</span>
          </h1>

          {/* ACCOUNT INFO */}
          <div className="profile-card">
            <h3>Account Information</h3>
            <span className="role-badge">{user.role}</span>

            <form onSubmit={handleProfileUpdate}>
              <label>Full Name</label>
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

              <button className="primary-btn">Update Profile</button>
            </form>
          </div>

          {/* PASSWORD */}
          <div className="profile-card">
            <h3>Change Password</h3>

            <form onSubmit={handlePasswordChange}>
              <label>Current Password</label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    oldPassword: e.target.value,
                  })
                }
              />

              <label>New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
              />

              <button className="secondary-btn">Change Password</button>
            </form>
          </div>

          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
