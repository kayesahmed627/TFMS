import MUIDataTable from "mui-datatables";
import { useEffect } from "react";

import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Snackbar } from "@mui/material";
import { format } from "date-fns";
import { deleteExhibitorParking, getExhibitorParkingDtos } from "../../services/ExhibitorPassService";

const ExhibitorParkingList = () => {
    const [parkings, setParkings] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [delId, setDelId] = useState('');
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetchExjibitorParkings();
    }, []);
    const fetchExjibitorParkings = async () => {
        try {
            const { data } = await getExhibitorParkingDtos();
            console.log(data);
            setParkings(data);
        } catch (e) {
            console.log(e);
        }
    };
    const doDeleteParking = async () => {
        try {
            const { res } = await deleteExhibitorParking(delId);
            const v = parkings.filter(x => x.ParkingPassId == delId);
            setParkings(v);
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
    doDeleteParking();
}
const handleNotificationClose = () => {
    setNotificationOpen(false);
};
const columns = [
   
    {
        name: "companyName",
        label: "Exhibitor Name",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "numberPlate",
        label: "Number Plate",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "parkingDate",
        label: "Parking Date",
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
        name: "checkInTime",
        label: "CheckIn Time",
        // type: 'date',
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "checkOutTime",
        label: "CheckOut Time",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "token",
        label: "Token Num",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "parkingPassId",
        label: "Action",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <>
                        <IconButton href={`/exhibitor-parking-edit/${value}`} color="primary" variant="contained"><EditIcon /></IconButton>

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
    return(
        <>
         <MUIDataTable title={"Exhibitor Parking List"} data={parkings} columns={columns}
     options={{
         selectableRows: false, hover: false,
         customToolbar: () => <Fab sx={{ ml: 1 }} variant="extended" size="medium" href="/exhibitor-parking-create" 
         color="primary"><AddIcon sx={{ mr: 1 }} /> Add New</Fab>,

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
export default ExhibitorParkingList;