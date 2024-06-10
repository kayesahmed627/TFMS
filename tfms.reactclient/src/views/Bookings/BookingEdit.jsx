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
import { getBookingById, getExhibitors, getPavilions, postBooking, updateBooking } from "../../services/BookingService";

const BookingEdit = () => {
    //States
    const [exhibitors, setExhibitors] = useState([]);
    const [pavilions, setPavilions] = useState([]);
    const [booking, setBooking] = useState([]);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [message, setMessage] = useState("");

    //Route params
    const { id } = useParams();
    //Form validation & initial values
    const validationSchema = Yup.object({
        exhibitorId: Yup.number().required("Exhibitor is required"),
        pavilionId: Yup.number().required("Pavilion is required"),
        bookingDate: Yup.date().required("Booking date is requred"),
        bookingAmount: Yup.number().required("Booking amount is required")
    });
    const initialValues = {
        ...booking,
    };
    // Data hooks
    useEffect(() => {
        fetchExhibitors();
        fetcPavillions();
        fetchBooking();
    }, []);
    const fetchBooking = async () => {
        console.log(id);

        const { data } = await getBookingById(id);
         data.bookingDate = format(data.bookingDate, "yyyy-MM-dd")
        
        setBooking(data);
        console.log("booking ", data);
    };
    const fetchExhibitors = async () => {
        const { data } = await getExhibitors();
        setExhibitors(data);
        console.log(data);
    };
    const fetcPavillions = async () => {
        const { data } = await getPavilions();
        setPavilions(data);
        console.log(data);
    };
    //Handlers
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values);

        const { data } = await updateBooking(booking.bookingId, {
            bookingId: booking.bookingId,
            exhibitorId: values.exhibitorId,
            pavilionId: values.pavilionId,
            bookingDate: values.bookingDate,
            bookingAmount: values.bookingAmount
        });
        setMessage("Data update successfully");
        setNotificationOpen(true);
    };
    const handleClose = () => {
        setNotificationOpen(false)
    };
    return (
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
                                    <Typography variant="h3">Booking Edit form</Typography>
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth={true}
                                        name="exhibitorId"
                                        label="Exhibitor Name"
                                        variant="standard"
                                        defaultValue={""}
                                        value={values.exhibitorId ?? ""}
                                        select
                                        onChange={(e) =>
                                            (values.exhibitorId = e.target.value ?? "")
                                        }
                                    >
                                        {exhibitors?.map((cat, index) => {
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
                                        name="pavilionId"
                                        label="Pavilion Name"
                                        variant="standard"
                                        defaultValue={""}
                                        value={values.pavilionId ?? ""}
                                        select
                                        onChange={(e) =>
                                            (values.pavilionId = e.target.value ?? "")
                                        }
                                    >
                                        {pavilions?.map((cat, index) => {
                                            return (
                                                <MenuItem key={index} value={cat.pavilionId}>
                                                    {cat.pavilionName}
                                                </MenuItem>
                                            );
                                        })}
                                    </Field>
                                    <FormHelperText>
                                        <ErrorMessage name="pavilionId" />
                                    </FormHelperText>
                                </Grid>
                                

                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth={true}
                                        name="bookingDate"

                                        variant="standard"
                                        type='date'
                                        helperText={<ErrorMessage name="bookingDate" />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth={true}
                                        name="bookingAmount"

                                        variant="standard"
                                        helperText={<ErrorMessage name="bookingAmount" />}
                                    />
                                </Grid>

                                <Grid item xs={12} style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <Button type="submit" color="primary" variant="contained">
                                        Update
                                    </Button>
                                    <Button href="/Bookings" color="primary" variant="contained">
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
export default BookingEdit;