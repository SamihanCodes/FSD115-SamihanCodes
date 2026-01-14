import { useState } from "react";
import { createListing } from "../api/listings";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [form, setForm] = useState({
    animal_type: "",
    breed: "",
    age: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createListing(form);
      alert("Listing created");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create listing");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Listing</h2>

      <input name="animal_type" placeholder="Animal Type" onChange={handleChange} required />
      <input name="breed" placeholder="Breed" onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateListing;
