import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoice } from "../api/invoice";
import Footer from "../components/Footer";
import "./Invoice.css";

const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    getInvoice(id).then((res) => setInvoice(res.data));
  }, [id]);

  if (!invoice) {
    return (
      <div className="page-wrapper invoice-page">
        <div className="glass-box">Loading invoice...</div>
      </div>
    );
  }

  return (
    <>
      <div className="page-wrapper invoice-page">
        {/* BACKGROUND PATTERN */}
        <div className="pattern-bg" />

        <div className="glass-box invoice-container">
          {/* HEADING */}
          <h1 className="page-title">Transaction Invoice</h1>
          <p className="page-subtitle">
            Official record of your transaction
          </p>

          {/* INVOICE CARD */}
          <div className="invoice-card">
            <div className="invoice-row">
              <span>Transaction ID</span>
              <strong>{invoice.id}</strong>
            </div>

            <div className="invoice-row">
              <span>Amount</span>
              <strong className="amount">
                ₹{invoice.amount}
              </strong>
            </div>

            <div className="invoice-row">
              <span>Status</span>
              <strong
                className={
                  invoice.status === "paid"
                    ? "status paid"
                    : "status pending"
                }
              >
                {invoice.status}
              </strong>
            </div>

            <div className="invoice-row">
              <span>Date</span>
              <strong>
                {new Date(invoice.created_at).toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Invoice;
