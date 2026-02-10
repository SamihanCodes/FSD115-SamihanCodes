import { useEffect, useState } from "react";
import { getMyInterests } from "../api/interests";
import Footer from "../components/Footer";
import "./MyInterests.css";

const MyInterests = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    getMyInterests().then((res) => setInterests(res.data));
  }, []);

  return (
    <>
      <div className="interests-page">
        {/* BACKGROUND PATTERN */}
        <div className="page-pattern" />

        <div className="interests-container glass-box">
          {/* HEADING */}
          <h1 className="page-heading">Interested Buyers</h1>
          <p className="page-subtext">
            Buyers who have shown interest in your livestock listings.
          </p>

          {interests.length === 0 && (
            <p className="empty-text">
              No buyers have shown interest yet.
            </p>
          )}

          <div className="interests-grid">
            {interests.map((i, index) => (
              <div className="interest-card" key={index}>
                <p>
                  <strong>Buyer Email:</strong>{" "}
                  <span className="buyer-email">
                    {i.buyer_email}
                  </span>
                </p>

                <p>
                  <strong>Animal:</strong>{" "}
                  {i.animal_type}
                </p>

                <p>
                  <strong>Listed Price:</strong>{" "}
                  ₹{i.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyInterests;
