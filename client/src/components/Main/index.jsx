import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Modal from "../Modal";

const Main = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userSelectedSlot, setUserSelectedSlot] = useState(null);
  const [age, setAge] = useState(null);
  const [firstname, setfirst] = useState(null);
  const [lastname, setlast] = useState(null);
  const [selection, setSelection] = useState(true);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const fetchUserSelectedSlot = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("haoo")
        const response = await axios.get("http://localhost:8080/api/fetch", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setFlag(response.data.flag);
        setUserSelectedSlot(response.data.selectedSlot);
        setAge(response.data.age);
        setfirst(response.data.firstName);
        setlast(response.data.lastName);

      } catch (error) {
        console.error("Error fetching user's selected slot", error.message);
      }
    };

    fetchUserSelectedSlot();
  }, []); 

  const handleSlotSelection = (timeSlot) => {
    setSelectedSlot(timeSlot);
    setModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/payment",
        { selectedSlot: selectedSlot },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserSelectedSlot(selectedSlot);
      setFlag(false);
      setModalOpen(false);
      console.log("Payment successful");
    } catch (error) {
      console.error("Payment failed", error.message);
    }
  };

  return (
    <div>
            <nav className={styles.navbar}>
        <h1>Yoga Class</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    <div className={styles.main_container}>


      {/* Display the user's selected slot */}
      {userSelectedSlot && (
        <div className={styles.selected_slot}>
          <h2>Yoga Class Details</h2>
          <p>
            <strong>Name:</strong> {firstname} {lastname}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Selected Timeslot:</strong> {userSelectedSlot}
          </p>

        </div>
      )}

      <div className={styles.timeslot_container}>
      <h1 style={{ fontSize: '2em', color: '#333', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase', fontWeight: 'bold' }}>
  Choose a Timeslot
</h1>
        {/* <div className={styles.timeslot_cards}>
          {["6-7 AM", "7-8 AM", "8-9 AM", "5-6 AM"].map((timeSlot) => (
            <div
              key={timeSlot}
              className={`${styles.timeslot_card} ${
                selectedSlot === timeSlot ? styles.selected : ""
              }`}
              onClick={() => handleSlotSelection(timeSlot)}
            >
              {timeSlot}
            </div>
          ))}
        </div>
      </div> */}
      <div className={styles.timeslot_cards}>
            {["6-7 AM", "7-8 AM", "8-9 AM", "5-6 AM"].map((timeSlot) => (
              <div
                key={timeSlot}
                className={`${styles.timeslot_card} ${
                  selectedSlot === timeSlot ? styles.selected : ""
                }`}
                onClick={flag ? () => handleSlotSelection(timeSlot) : null}
                style={{ cursor: selection ? 'pointer' : 'not-allowed', opacity: flag ? 1 : 0.5 }}
              >
                {timeSlot}
              </div>
            ))}
          </div>
          {!flag && (<p>Now Time Slot can be changed next month. See ya!</p>)}
        </div>
      {/* Add your modal or window component here */}
      {selectedSlot && modalOpen && (
        <Modal
          setOpenModal={setModalOpen}
          selectedSlot={selectedSlot}
          handlePayment={handlePayment}
        />
      )}
    </div>
    </div>
  );
};

export default Main;
