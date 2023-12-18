import React, { useState } from "react";
import styles from "./styles.module.css";
import Modal from "../Modal";


const Main = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

	const handleSlotSelection = (timeSlot) => {
		setSelectedSlot(timeSlot);
		setModalOpen(true); 
	  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Yoga Class</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.timeslot_container}>
        <h2>Choose a Timeslot</h2>
        <div className={styles.timeslot_cards}>
          {["4.30", "5.30", "6.30", "7.30"].map((timeSlot) => (
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
      </div>

      {/* Add your modal or window component here */}
      {selectedSlot &&modalOpen && <Modal setOpenModal={setModalOpen} selectedSlot={selectedSlot} />}
    </div>
  );
};

export default Main;
