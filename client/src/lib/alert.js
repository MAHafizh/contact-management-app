import Swal from 'sweetalert2'

export const alertSuccess = async(message) => {
    return Swal.fire({
        title: 'Success',
        text: message,
        icon: 'success'
    })
}

export const alertError = async(message) => {
    return Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error'
    })
}