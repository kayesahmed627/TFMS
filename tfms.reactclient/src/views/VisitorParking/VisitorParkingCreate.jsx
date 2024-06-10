import {
    Button,
    Container,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { getVehicleTypeOptions, getVisitors, postVisitorParking } from "../../services/VisitorParkingService";
const VisitorParkingCreate = () => {
    //States
const [visitors, setVisitors] = useState([]);
const [vehicleType, setVehicleType] = useState([]);
const [notificationOpen, setNotificationOpen] = useState(false);
const [message, setMessage] = useState("");
const validationSchema = Yup.object({
    visitorId: Yup.number().required("Visitor is required"),
    vehicleType:Yup.number().required("VehicleType is required"),
    numberPlate: Yup.string().required("numberPlate is required"),
    parkingDate: Yup.date().required("parkingDate date is requred"),
    checkInTime: Yup.string().required("CheckInTime date is requred"),
    checkOutTime: Yup.string().required("CheckOutTime date is requred"),
    token: Yup.string().required("Token date is requred"),
    parkingFare:Yup.number().required("ParkingFare is required")
});
const initialValues = {
    visitorId: "",
    vehicleType:"",
    numberPlate: "",
    parkingDate: "",
    checkInTime: "",
    checkOutTime: "",
    token:"",
    parkingFare:"",
};

useEffect(() => {
    fetchVehicleTypes();
}, []);
const fetchVehicleTypes = async () => {
    const { data } = await getVehicleTypeOptions()
    setVehicleType(data);
    console.log(data);
}


// Data hooks
useEffect(() => {
    fetchVisitors();
 
}, []);
const fetchVisitors = async () => {
    const { data } = await getVisitors();
    setVisitors(data);
    console.log(data);
};
//Handlers
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values);
    try {
        let parkings = {
            visitorId: values.visitorId,
            vehicleType:values.vehicleType,
            numberPlate: values.numberPlate,
            parkingDate: values.parkingDate,
            checkInTime: values.checkInTime,
            checkOutTime: values.checkOutTime,
            token:values.token,
            parkingFare:values.parkingFare

        };
        console.log(parkings);
        await postVisitorParking(parkings);
        resetForm();
    }
    catch (error) {
        console.error(error);
    } 
    finally {
        setSubmitting(false);
    }
    setMessage("Data Save successfully");
    setNotificationOpen(true);
};
const handleClose = () => {
    setNotificationOpen(false)
};
    return(
        <Container>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, values, handleChange }) => {
                return (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h3">Visitor Parking form</Typography>
                            </Grid>
    
    
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="visitorId"
                                    label="Visitor Name"
                                    variant="standard"
                                    select
                                    onChange={e => values.visitorId = e.target.value}
                                >
                                    {visitors.map((cat, index) => {
                                        return (
                                            <MenuItem key={index} value={cat.visitorId}>
                                                {cat.visitorName}
                                            </MenuItem>
                                        );
                                    })}
                                </Field>
                                <FormHelperText>
                                    <ErrorMessage name="visitorId" />
                                </FormHelperText>
                            </Grid>
    
                            
                            <Grid item xs={6}>
                                    <InputLabel id='catId'>VehicleType</InputLabel>
                                    <Field
                                        as={Select}
                                        fullWidth={true}
                                        name="vehicleType"
                                        labelId="catId"
                                        variant="standard"
                                    >
                                        <MenuItem value={1}>Car</MenuItem>
                                        <MenuItem value={2}>Bike</MenuItem>
                                        <MenuItem value={3}>MiniTruck</MenuItem>
                                        <MenuItem value={4}>CNG</MenuItem>
                                        <MenuItem value={5}>Others</MenuItem>

                                    </Field>
                                    <FormHelperText><ErrorMessage name="vehicleType" /></FormHelperText>
                                </Grid>

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="numberPlate"
                                    label="numberPlate"
                                    variant="standard"
                                   
                                    helperText={<ErrorMessage name="numberPlate" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="parkingDate"
    
                                    variant="standard"
                                    type='date'
                                    helperText={<ErrorMessage name="parkingDate" />}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="checkInTime"
                                    label="checkInTime"
                                    variant="standard"
                                    helperText={<ErrorMessage name="checkInTime" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="checkOutTime"
                                    label="checkOutTime"
                                    variant="standard"
                                    helperText={<ErrorMessage name="checkOutTime" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="token"
                                    label="Token"
                                    variant="standard"
                                    helperText={<ErrorMessage name="token" />}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="parkingFare"
                                    label="ParkingFare"
                                    variant="standard"
                                    helperText={<ErrorMessage name="parkingFare" />}
                                />
                            </Grid>

                            <Grid item xs={12} style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <Button type="submit" color="primary" variant="contained">
                                    Submit
                                </Button>
                                <Button href="/visitor-parking" color="primary" variant="contained">
                                    Back to Booked list
                                </Button>
    
                            </Grid>
                        </Grid>
                       
                    </Form>
                );
            }}
        </Formik>
        <Snackbar
            open={notificationOpen}
            autoHideDuration={2000}
            message={message}
            action={"Undo"}
            onClose={handleClose}
        />
    </Container>
    );
}
export default VisitorParkingCreate