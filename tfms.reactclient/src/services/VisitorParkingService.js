import axios from "axios";
import { apiUrl } from "../constants/app-constants";

export async function getVisitorParking() {
    return await axios.get(`${apiUrl}/api/Parkings`);
}
export async function getVisitorParkingById(id){
    return await axios.get(`${apiUrl}/api/Parkings/${id}`);
}
export async function getVisitorParkingDtos(){
    return await axios.get(`${apiUrl}/api/Parkings/DTO/2`);
}
export async function getVehicleTypeOptions() {
    return await axios.get(`${apiUrl}/api/Parkings/Options/VehicleType`);
}

export async function postVisitorParking(data){
    return await axios.post(`${apiUrl}/api/Parkings`, data); 
}
export async function getVisitors()
{
    return await axios.get(`${apiUrl}/api/Visitors`);
}

export async function updateVisitorParking(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/Parkings/${id}`, data); 
}
export async function deleteVisitorParking(id){
    console.log(id)
    return await axios.delete(`${apiUrl}/api/Parkings/${id}`); 
}