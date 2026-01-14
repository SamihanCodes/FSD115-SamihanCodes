import { useEffect, useState } from "react";
import { getAllListings } from "../api/listings";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getAllListings().then((res) => setListings(res.data));
  }, []);

  return (
    <div>
      <h2>Available Listings</h2>

      {listings.map((l) => (
        <div key={l.id}>
          <p>{l.animal_type} - ₹{l.price}</p>
          <p>{l.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
