import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import video from "../../assets/VideoDemo.mp4"

function DemoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Demo Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ratio ratio-16x9">
          <iframe
            src={video}
            title="Vimeo video"
            allowFullScreen
          ></iframe>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:'#1F4B43'}} onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DemoModal;
