import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const ActionButtons = ({ id, onDeleteClick, updatePath }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        onDeleteClick(id);
      }
    });
  };
  return (
    <>
      {updatePath && (
        <NavLink to={updatePath} className="btn btn-sm btn-success rounded-circle e me-2">
          <i className="fa fa-pencil"></i>
        </NavLink>
      )}

      <NavLink to="/delete" className="btn btn-sm btn-danger rounded-circle" onClick={handleDelete}>
        <i className="fa fa-trash"></i>
      </NavLink>
    </>
  );
};

export default ActionButtons;
