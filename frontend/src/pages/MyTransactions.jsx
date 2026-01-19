import { useEffect, useState } from "react";
import { getMyTransactions, payTransaction } from "../api/transactions";
import { useAuth } from "../context/AuthContext";

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
    <div className="container">
      <h2>My Transactions</h2>

      {transactions.length === 0 && <p>No transactions found</p>}

      {transactions.map((t) => (
        <div key={t.id} className="card">
          <p><strong>Amount:</strong> ₹{t.amount}</p>
          <p><strong>Status:</strong> {t.status}</p>

          {t.status === "pending" && user?.id === t.buyer_id && (
            <button onClick={() => handlePay(t.id)}>
              Pay Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTransactions;
