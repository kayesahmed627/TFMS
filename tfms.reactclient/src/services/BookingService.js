import axios from "axios";
import { apiUrl } from "../constants/app-constants";

export async function getBookings() {
    return await axios.get(`${apiUrl}/api/Bookings`);
}
export async function getBookingById(id){
    return await axios.get(`${apiUrl}/api/Bookings/${id}`);
}
export async function getBookingDtos(){
    return await axios.get(`${apiUrl}/api/Bookings/DTO/2`);
}
export async function postBooking(data){
    return await axios.post(`${apiUrl}/api/Bookings`, data); 
}
export async function getPavilions()
{
    return await axios.get(`${apiUrl}/api/Pavilions/NotBooked/Include`);
}
export async function getExhibitors()
{
    return await axios.get(`${apiUrl}/api/Exhibitors`);
}

export async function updateBooking(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/Bookings/${id}`, data); 
}
export async function deleteBooking(id){
    console.log(id)
    return await axios.delete(`${apiUrl}/api/Bookings/${id}`); 
}