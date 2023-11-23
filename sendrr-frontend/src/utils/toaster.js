import toast, { Toaster } from 'react-hot-toast';

export const toastSuccess = (message) => toast.success(message, {
    // icon: "🔔",
    style: {
        borderRadius: '36px',
        background: "rgba(20,20,20)",
        boxShadow: "0 5px 16px rgba(0,0,0,0.2)",
        color: "white",
        border: "2px solid #741786",
        textAlign: "start"
    }
});
export const toastError = (message) =>  toast.error(message, {
    style: {
        borderRadius: '36px',
        background: "rgba(20,20,20)",
        boxShadow: "0 5px 16px rgba(0,0,0,0.2)",
        color: "white",
        border: "2px solid #741786",
        textAlign: "start"
    }
})

export const toastMessage = (message)=> toast(message,  {
    icon: "🔔",
    style: {
        borderRadius: '36px',
        background: "rgba(20,20,20)",
        boxShadow: "0 5px 16px rgba(0,0,0,0.2)",
        color: "white",
        border: "2px solid #741786",
        textAlign: "start"
    }
})