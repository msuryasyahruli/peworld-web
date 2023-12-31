import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { deleteExpAction } from "../../config/redux/actions/expAction";

function ModalDelete({skill_id,children}) {
  // const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.NEXT_PUBLIC_API}/skill/${skill_id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("skill deleted");
        setShow(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setShow(false);
      });
  };

  return (
    <div>
      <Button className="m-1" style={{background: "rgba(251, 176, 23, 0.6)", border: "1px solid #fbb017",}} onClick={handleShow}>
        {children}
      </Button>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <h4 className="text-center">Are you sure wannna delete this?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-danger">
              Delete
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ModalDelete;
