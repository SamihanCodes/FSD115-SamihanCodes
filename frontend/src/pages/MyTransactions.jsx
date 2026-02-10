import { useEffect, useState } from "react";
import { getMyTransactions, payTransaction } from "../api/transactions";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./MyTransactions.css";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getMyTransactions().then((res) => setTransactions(res.data));
  }, []);

  const handlePay = async (id) => {
    try {
      await payTransaction(id);
      alert("Payment successful (simulated)");
      window.location.reload();
    } catch {
      alert("Payment failed");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="page-pattern" />

        <div className="transactions-container glass-box">
          {/* HEADING */}
          <h1 className="page-title">
            My Transactions
          </h1>

          <p className="page-subtitle">
            Track payments and download invoices for completed deals.
          </p>

          {transactions.length === 0 && (
            <p className="empty-text">
              No transactions found.
            </p>
          )}

          <div className="transactions-grid">
            {transactions.map((t) => (
              <div key={t.id} className="transaction-card">
                <p>
                  <strong>Amount:</strong>{" "}
                  <span className="amount">
                    ₹{t.amount}
                  </span>
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {t.status === "paid" ? (
                    <span className="status paid">Paid</span>
                  ) : (
                    <span className="status pending">Pending</span>
                  )}
                </p>

                {/* Buyer action */}
                {user?.id === t.buyer_id && t.status === "pending" && (
                  <button
                    className="pay-btn"
                    onClick={() => handlePay(t.id)}
                  >
                    Pay Now
                  </button>
                )}

                {/* Invoice */}
                {t.status === "paid" && (
                  <Link
                    to={`/invoice/${t.id}`}
                    className="invoice-link"
                  >
                    View Invoice
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyTransactions;
