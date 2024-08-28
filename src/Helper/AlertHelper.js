

import Swal from "sweetalert2";


 
//Delete Alert

export function deleteAlert(id) {

    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#689F38",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
}
//Update Alert

export function updateAlert(id,status) {

    return Swal.fire({
        title: "Status Update?",
        text: "You want to update task status!",
        showCancelButton: true,
        confirmButtonColor: "#04cc39",
        cancelButtonColor: "#d33",
        confirmButtonText: "Update!",
        input: "select",
        inputOptions: {new: "New",progress: "Progress",completed: "Completed",cancelled: "Cancelled"},
        inputValue: status,
      })
}