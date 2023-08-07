import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
// import { updateExpAction } from "../../config/redux/actions/expAction";
// import { useDispatch } from "react-redux";

function ModalUpdate({
  portfolio_id,
  app_name,
  link_repo,
  tipe,
  children,
}) {
  // const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({
    app_name,
    link_repo,
    tipe,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:2525/portfolio/${portfolio_id}`, data)
      .then((res) => {
        setData(res.data.data[0]);
        // console.log(res.data.data[0]);
        alert("experience updated");
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
      <Button className="m-1" variant="warning" onClick={handleShow}>
        {children}
      </Button>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Update Portfolio</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              type="text"
              className="form-control mt-3"
              name="app_name"
              value={data.app_name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-3"
              name="link_repo"
              value={data.link_repo}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-3"
              name="tipe"
              value={data.tipe}
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-warning">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ModalUpdate;