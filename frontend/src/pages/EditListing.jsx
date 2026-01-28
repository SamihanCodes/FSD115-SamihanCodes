import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMyListings,
  updateListing,
  deleteListing,
} from "../api/listings";

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
      <div className="container">
        <div className="card">Loading…</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Edit Listing</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="animal_type"
            value={form.animal_type}
            onChange={handleChange}
            required
          />

          <input
            name="breed"
            value={form.breed}
            onChange={handleChange}
          />

          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">Update Listing</button>
        </form>

        {/* 🔴 DELETE */}
        <button
          onClick={handleDelete}
          style={{
            marginTop: "12px",
            backgroundColor: "#EF4444",
          }}
        >
          Delete Listing
        </button>
      </div>
    </div>
  );
};

export default EditListing;
