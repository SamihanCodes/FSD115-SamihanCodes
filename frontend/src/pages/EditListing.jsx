import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMyListings,
  updateListing,
  deleteListing,
} from "../api/listings";
import Footer from "../components/Footer";
import "./EditListing.css";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    animal_type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyListings().then((res) => {
      const listing = res.data.find(
        (l) => String(l.id) === String(id)
      );

      if (!listing) {
        alert("Listing not found");
        navigate("/listings/my");
        return;
      }

      setForm({
        animal_type: listing.animal_type ?? "",
        breed: listing.breed ?? "",
        age: listing.age ?? "",
        price: listing.price ?? "",
        description: listing.description ?? "",
      });

      setLoading(false);
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateListing(id, {
        animal_type: form.animal_type,
        breed: form.breed,
        age: form.age ? Number(form.age) : null,
        price: Number(form.price),
        description: form.description,
      });

      alert("Listing updated successfully");
      navigate("/listings/my");
    } catch {
      alert("Failed to update listing");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will permanently delete the listing."
    );

    if (!confirmDelete) return;

    try {
      await deleteListing(id);
      alert("Listing deleted");
      navigate("/listings/my");
    } catch {
      alert("Failed to delete listing");
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="glass-box">Loading listing…</div>
      </div>
    );
  }

  return (
    <>
      <div className="page-wrapper edit-listing-page">
        {/* BACKGROUND PATTERN */}
        <div className="pattern-bg" />

        <div className="glass-box edit-listing-container">
          {/* HEADING */}
          <h1 className="page-title">Edit Listing</h1>
          <p className="page-subtitle">
            Update details of your livestock listing
          </p>

          <form onSubmit={handleSubmit} className="edit-form">
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
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={handleChange}
            />

            <label>Price (₹)</label>
            <input
              name="price"
              type="number"
              min="1"
              value={form.price}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
            />

            <button type="submit" className="btn-primary">
              Update Listing
            </button>
          </form>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="btn-danger"
            disabled={loading}
          >
            Delete Listing
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditListing;
