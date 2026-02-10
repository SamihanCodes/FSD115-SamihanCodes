import { useState } from "react";
import { createListing } from "../api/listings";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./CreateListing.css";

const CreateListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    animal_type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.animal_type || !form.price) {
      alert("Animal type and price are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) =>
        formData.append(k, v)
      );
      images.forEach((img) => formData.append("images", img));

      await createListing(formData);
      alert("Listing created successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to create listing"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-page">
        {/* BACKGROUND PATTERN */}
        <div className="page-pattern" />

        <div className="create-container glass-box">
          <h1 className="page-title">Create Listing</h1>

          <form className="listing-form" onSubmit={handleSubmit}>
            <label>Animal Type</label>
            <input
              name="animal_type"
              value={form.animal_type}
              onChange={handleChange}
              required
            />

            <label>Breed</label>
            <input
              name="breed"
              value={form.breed}
              onChange={handleChange}
            />

            <label>Age</label>
            <input
              type="number"
              name="age"
              min="0"
              value={form.age}
              onChange={handleChange}
            />

            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              min="1"
              value={form.price}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
            />

            <label>Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />

            {preview.length > 0 && (
              <div className="image-preview">
                {preview.map((src, i) => (
                  <img key={i} src={src} alt="preview" />
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateListing;
