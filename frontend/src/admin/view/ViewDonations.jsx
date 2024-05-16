import React, { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import axios from "axios";
const ViewDonations = ({ donation, closeModal }) => {
  const [amount, setAmount] = useState(0);

  const handlePay = async (e) => {
    const currency = "INR";
    setAmount(amount * 100);
    const response = await fetch("http://localhost:3000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    });

    const order = await response.json();
    console.log("order", order);

    var option = {
      key: "",
      amount,
      currency,
      name: donation.name,
      description: donation.description,
      image:
        "https://vjti.ac.in/wp-content/uploads/oldupload/cropped-New-VJTI-Logo_1-1-60x87.jpg",
      order_id: order.id,
      handler: async function (res) {
        alert("Success");
      },
    };
    var rzp1 = new Razorpay(option);
    rzp1.on("payment.failed", function (res) {
      alert(res.error.code);
    });
    rzp1.open();
    e.preventDefault();
    const formData = {
      id: donation.id,
      amount: amount / 100,
    };

    const formData2 = {
      amount_donated: amount / 100,
      user_id: localStorage.getItem("user_id"),
      donated_to_id: donation.id,
    };

    await axios
      .put("http://localhost:3000/auth/updatedonation", formData)
      .then(async (res) => {
        await axios
          .post("http://localhost:3000/auth/adddonor", formData2)
          .then((res) => toast.success(res.data.message));
      });
  };
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">View Donation Details</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <div className="job-details">
              <p>
                <strong>Title:</strong>
                {donation.title}
              </p>
              <p>
                <strong>Amount Required:</strong>
                {donation.total_amount}
              </p>
              {/* <p><strong>Amount Collected:</strong> <FaMapMarker /> {donation.amount_collected}</p> */}
              <hr className="divider" />
              <div
                className="description"
                style={{ maxHeight: "50vh", overflowY: "auto" }}
              >
                <p
                  dangerouslySetInnerHTML={{ __html: donation.description }}
                ></p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: "50px", gap: "1rem" }}>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter the amount you want to donate"
              style={{ width: "600px" }}
            />
            <button
              className="btn btn-secondary"
              style={{ width: "60px", backgroundColor: "green" }}
              type="button"
              onClick={handlePay}
            >
              Pay
            </button>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDonations;
