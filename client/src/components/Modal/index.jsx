import React from "react";
import axios from "axios";

import "./Modal.css";

function Modal({ setOpenModal, selectedSlot, handlePayment }) {
    const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Make Payment</h1>
          <p>Selected Timeslot: {selectedSlot}</p>
        </div>
        <div className="body">
        <div className="noteSection">
            <p className="note">Note: 1. Slots can only be changed next month</p>
            <p className="note"> 2. The payment is fixed at 500 INR. Class booking will be valid until the end of {currentMonth} {currentYear}</p>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={handlePayment}>Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;