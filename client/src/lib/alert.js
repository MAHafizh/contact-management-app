import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
  return Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
};

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "question",
    showCancelButton: true,
    cancelButtonColor: "rgba(255, 0, 0, 1)",
    confirmButtonColor: "#002fffff",
    confirmButtonText: "Delete",
  });
  return result.isConfirmed
};
