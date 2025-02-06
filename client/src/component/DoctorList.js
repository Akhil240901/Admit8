import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  if (!doctor || doctor.length === 0) {
    return <p>No doctors available</p>;
  }
  return (
    <div className="card m-2">
      <div
        className="card-header "
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctors/book-appointment/${doctor._id}`)}
      >
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className="card-body">
        <p>
          <b>Specialization :</b> {doctor.specialization}
        </p>
        <p>
          <b>Experience :</b> {doctor.experience} years
        </p>
        <p>
          <b>Fees Per consultation :</b> {doctor.feePerConsultation}
        </p>
        <p>
          <b>Timings :</b> {doctor.timing[0]}-{doctor.timing[1]}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
