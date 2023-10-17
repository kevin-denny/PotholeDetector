import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddImagesPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleDetectClick = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://localhost:5000/api/detect", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setDetectedImage(
          `data:image/jpeg;base64,${data.annotated_image_base64}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Object Detection</h2>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <div className="d-flex gap-4 mb-4">
        {selectedFile && (
          <div style={{ maxWidth: "300px", maxHeight: "300px" }}>
            <h4>Uploaded Image:</h4>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="img-fluid"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <br />
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                handleDetectClick();
              }}
            >
              Detect Objects
            </button>
          </div>
        )}
        {detectedImage && (
          <div
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              cursor: "pointer",
            }}
            onClick={openModal}
          >
            <h4>Detected Image:</h4>
            <img
              src={detectedImage}
              alt="Detected"
              className="img-fluid"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detected Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={detectedImage}
                  alt="Detected"
                  className="img-fluid"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddImagesPage;
