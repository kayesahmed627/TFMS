import MUIDataTable from "mui-datatables";
import { useEffect } from "react";
import { deleteBooking, getBookingDtos, getBookings } from "../../services/BookingService";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Snackbar } from "@mui/material";
import { format } from "date-fns";
const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [delId, setDelId] = useState('');
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetchBookings();
    }, []);


    const fetchBookings = async () => {
        try {
            const { data } = await getBookingDtos();
            console.log(data);
            setBookings(data);
        } catch (e) {
            console.log(e);
        }
    };
    const doDeleteBooking = async () => {
        try {
            const { res } = await deleteBooking(delId);
            const v = bookings.filter(x => x.bookingId == delId);
            setBookings(v);
            setDelId('');
            setAlertOpen(false);
            setMessage('Data is deleted');
            setNotificationOpen(true);


        } catch (e) {
            // console.error(e);
        }
    };


    //Alert 
    const handleAlertClose = () => {
        setAlertOpen(false)
    }
    const handleYes = () => {
        doDeleteBooking();
    }
    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };
    const columns = [
        {
            name: "pavilionName",
            label: "Pavilion Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "companyName",
            label: "Exhibitor Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "bookingDate",
            label: "BookingDate",
            type: 'date',

            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <span>{format(value, "yyyy-MM-dd")}</span>
                    );
                },

            }
        },
        {
            name: "bookingAmount",
            label: "BookingAmount",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "bookingId",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <IconButton href={`/booking-edit/${value}`} color="primary" variant="contained"><EditIcon /></IconButton>

                            <IconButton onClick={() => {
                                setDelId(value);
                                setAlertOpen(true)
                            }} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    );
                },
            },
        },

    ];
    return (
        <>
            <MUIDataTable title={"Bookings List"} data={bookings} columns={columns}
                options={{
                    selectableRows: false, hover: false,
                    customToolbar: () => <Fab sx={{ ml: 1 }} variant="extended" size="medium" href="/booking-create" color="primary"><AddIcon sx={{ mr: 1 }} /> Add New</Fab>,

                }}
            />
            <Dialog
                open={alertOpen}
                onClose={handleAlertClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete item?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose}>No</Button>
                    <Button onClick={handleYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={notificationOpen}
                autoHideDuration={2000}
                message={message}
                action={"DISMISS"}
                onClose={handleNotificationClose}
            />
        </>
    )
}
export default BookingList;