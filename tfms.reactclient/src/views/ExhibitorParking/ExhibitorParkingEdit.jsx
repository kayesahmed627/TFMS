import {
    Button,
    Container,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
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
import { getExhibitorParkingById, getExhibitors, updateExhibitorParking } from "../../services/ExhibitorPassService";
const ExhibitorParkingEdit = () => {
    const [exhibitors, setExhibitors] = useState([]);
    const [parking, setParking] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");
    //Route params
 const { id } = useParams();


 const validationSchema = Yup.object({
    exhibitorId: Yup.number().required("Exhibitor is required"),
    numberPlate: Yup.string().required("numberPlate is required"),
    parkingDate: Yup.date().required("parkingDate date is requred"),
    checkInTime: Yup.string().required("CheckInTime date is requred"),
    checkOutTime: Yup.string().required("CheckOutTime date is requred"),
    token: Yup.string().required("Token date is requred")
});
const initialValues = {
    ...parking,
};
useEffect(() => {
    fetchExhibitors();
    fetchExhibitorParking();
}, []);
const fetchExhibitorParking = async () => {
    console.log(id);
    const { data } = await getExhibitorParkingById(id);
     data.parkingDate = format(data.parkingDate, "yyyy-MM-dd")
    setParking(data);
    console.log("parking ", data);
};
const fetchExhibitors = async () => {
    const { data } = await getExhibitors();
    setExhibitors(data);
    console.log(data);
};
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);

    const { data } = await updateExhibitorParking(parking.parkingPassId, {
        parkingPassId: parking.parkingPassId,
        exhibitorId: values.exhibitorId,
        numberPlate: values.numberPlate,
        parkingDate:values.parkingDate,
        checkInTime: values.checkInTime,
        checkOutTime:values.checkOutTime,
        token:values.token
      
    });
    setMessage("Data update successfully");
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
                                <Typography variant="h3">Parking Edit form</Typography>
                            </Grid>
    
    
                            <Grid item xs={6}>
                                <Field
                                    as={TextField}
                                    fullWidth={true}
                                    name="exhibitorId"
                                    label="Company Name"
                                    variant="standard"
                                    defaultValue={""}
                                    value={values.exhibitorId ?? ""}
                                    select
                                    onChange={e => values.exhibitorId = e.target.value}
                                >
                                    {exhibitors.map((cat, index) => {
                                        return (
                                            <MenuItem key={index} value={cat.exhibitorId}>
                                                {cat.companyName}
                                            </MenuItem>
                                        );
                                    })}
                                </Field>
                                <FormHelperText>
                                    <ErrorMessage name="exhibitorId" />
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
    
                            <Grid item xs={12} style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <Button type="submit" color="primary" variant="contained">
                                    Submit
                                </Button>
                                <Button href="/exhibitor-parking" color="primary" variant="contained">
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
    )
}
export default ExhibitorParkingEdit;