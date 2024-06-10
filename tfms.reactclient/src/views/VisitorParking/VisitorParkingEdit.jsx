
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
import { getVehicleTypeOptions, getVisitors, getVisitorParkingById, updateVisitorParking } from "../../services/VisitorParkingService";
const VisitorParkingEdit = () => {
const [visitors, setVisitors] = useState([]);
const [parking, setParking] = useState([]);
const [vehicleType, setVehicleType] = useState([]);
const [notificationOpen, setNotificationOpen] = useState(false);
const [message, setMessage] = useState("");
//Route params
 const { id } = useParams();

const validationSchema = Yup.object({
    visitorId: Yup.number().required("Visitor is required"),
    vehicleType:Yup.number().required("VehicleType is required"),
    numberPlate: Yup.string().required("numberPlate is required"),
    parkingDate: Yup.date().required("parkingDate date is required"),
    checkInTime: Yup.string().required("CheckInTime date is required"),
    checkOutTime: Yup.string().required("CheckOutTime date is required"),
    token: Yup.string().required("Token date is required"),
    parkingFare:Yup.number().required("ParkingFare is required")
});
const initialValues = {
    ...parking,
};

useEffect(() => {
    fetchVisitors();
    fetchVisitorParking();
    //fetchVehicleTypes();
}, []);

const fetchVisitors = async () => {
    const { data } = await getVisitors();
    setVisitors(data);
    console.log(data);
};

const fetchVisitorParking = async () => {
    console.log(id);
    const { data } = await getVisitorParkingById(id);

     data.parkingDate = format(data.parkingDate, "yyyy-MM-dd")
    setParking(data);
    console.log("parking ", data);
};
// const fetchVehicleTypes = async () => {
//     const { data } = await getVehicleTypeOptions()
//     setVehicleType(data);
//     console.log(data);
// }

//Handlers
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
     console.log(values);
     const { data } = await updateVisitorParking(parking.parkingId, {
        parkingId: parking.parkingId,
        visitorId: values.visitorId,
        vehicleType:values.vehicleType,
        numberPlate: values.numberPlate,
        parkingDate:values.parkingDate,
        checkInTime: values.checkInTime,
        checkOutTime:values.checkOutTime,
        token:values.token,
        parkingFare:values.parkingFare
    });
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
            enableReinitialize={true}
        >
            {({ isSubmitting, setFieldValue, values, handleChange }) => {
                return (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h3">Visitor Parking Edit form</Typography>
                            </Grid>
    
    
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="visitorId"
                                    label="Visitor Name"
                                    variant="standard"
                                    defaultValue={""}
                                    value={values.visitorId ?? ""}
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
                                    <Field
                                        as={TextField}
                                        fullWidth={true}
                                        name="vehicleType"
                                        
                                        variant="standard"
                                        defaultValue={""}
                                        value={values.vehicleType ?? ""}
                                        select
                                        onChange={(e) =>
                                            (values.vehicleType = e.target.value ?? "")
                                        }
                                    >

                                        <MenuItem value={1}>Car</MenuItem>
                                        <MenuItem value={2}>Bike</MenuItem>
                                        <MenuItem value={3}>MiniTruck</MenuItem>
                                        <MenuItem value={4}>CNG</MenuItem>
                                        <MenuItem value={5}>Others</MenuItem>

                                    </Field>
                                    <FormHelperText>
                                        <ErrorMessage name="VehicleType" />
                                    </FormHelperText>
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
export default VisitorParkingEdit