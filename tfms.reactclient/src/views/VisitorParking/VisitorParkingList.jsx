import { useEffect } from "react";
import { useState } from "react"
import { deleteVisitorParking, getVehicleTypeOptions, getVisitorParkingDtos } from "../../services/VisitorParkingService";
import { set } from "date-fns";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Snackbar } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MUIDataTable from "mui-datatables";
import { format } from "date-fns";

const VisitorParkingList = () => {
    const [parkings, setParkings] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [delId, setDelId] = useState('');
    const [notificationOpen, setNotificationOpen] =useState(false);
    const [message ,setMessage] = useState("");
    useEffect(()=>{
        fetchVisitorParkings();
        fetchVehicleTypes();
    },[]);

    const fetchVisitorParkings = async ()=>{
        try {
            const {data} = await getVisitorParkingDtos();
            console.log(data);
            setParkings(data);
        }
        catch (e){
            console.log(e);
        }
    };

    const fetchVehicleTypes = async ()=>{
        try{
            const {data}= await getVehicleTypeOptions();
            console.log(data);
            setVehicleTypes(data);
        }
        catch (e){
            console.log(e);
        }
    };

    const getVehicleTypeName = (v)=>{
        switch (v){
            case 1: return 'Car';
            case 2: return 'Bike';
            case 3: return 'MiniTruck';
            case 4: return 'CNG';
            default: return 'others'
        }
    };

    const doDeleteParking = async ()=>{
        try{
            const {res}=await deleteVisitorParking(delId);
            const v = parkings.filter(x=>x.ParkingId == delId);
            setParkings(v);
            setDelId(v);
            setAlertOpen(false);
            setMessage('Data is deleted');
            setNotificationOpen(true);
        }
        catch (e){
            console.log(e);
        }
    }
    const handleAlertClose=()=>{
        setAlertOpen(false)
    }
    const handleYes = ()=>{
        doDeleteParking();
    }
    const handleNotificationClose = ()=>{
        setNotificationOpen(false);
    }
    const columns =[
        {
            name:"visitorName",
            label:"Visitor Name",
            options:{
                filter:true,
                sort:true,
            },
        },
        {
            name:"vehicleType",
            label:"Vehicle Type",
            options:{
                filter:true,
                sort:true,
                customBodyRender:(value, tableMeta, updateValue)=>{
                    console.log(value)
                    return(
                        <>{getVehicleTypeName(value)}</>
                    )
                }
            }
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
                        <>
                        <span>{format(value, "yyyy-MM-dd")}</span>
                        </>
                    );
                },
    
            }
        },
        {
            name: "checkInTime",
            label: "CheckIn Time",
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
            name: "parkingFare",
            label: "ParkingFare",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "parkingId",
            label: "Action",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                        <IconButton href={`/visitor-parking-edit/${value}`} color="primary" variant="contained"><EditIcon /></IconButton>
                        <IconButton onClick={()=>{
                            setDelId(value);
                            setAlertOpen(true)
                        }} color="error"><DeleteIcon></DeleteIcon></IconButton>
                        </>
                    );
                },
            },
        },  
        ];
        return(
            <>
            <MUIDataTable title={"Visitor Parking List"} data ={parkings} columns={columns}
            options={{
                selectableRows: false, hover: false,
                customToolbar: () => <Fab sx={{ ml: 1 }} variant="extended" size="medium" href="/visitor-parking-create" 
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
                {"Delete Item?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <button onClick={handleAlertClose}>No</button>
                <button onClick={handleYes} autoFocus>Yes</button>
            </DialogActions>
            </Dialog>
            <Snackbar
            open={notificationOpen}
            autoHideDuration={2000}
            message={"DISMISS"}
            onClose={handleNotificationClose}
            />
            </>
        )
}
export default VisitorParkingList;