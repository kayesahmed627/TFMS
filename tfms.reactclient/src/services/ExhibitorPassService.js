import axios from "axios";
import { apiUrl } from "../constants/app-constants";

export async function getExhibitorParking(){
    return await axios.get(`${apiUrl}/api/ParkingPasses`);
}
export async function getExhibitorParkingById(id){
    return await axios.get(`${apiUrl}/api/ParkingPasses/${id}`);
}
export async function getExhibitorParkingDtos(){
    return await axios.get(`${apiUrl}/api/ParkingPasses/DTO/2`);
}
export async function postExhibitorParking(data){
    return await axios.post(`${apiUrl}/api/ParkingPasses`, data); 
}

export async function getExhibitors()
{
    return await axios.get(`${apiUrl}/api/Exhibitors`);
}

export async function updateExhibitorParking(id, data){
    console.log(data)
    return await axios.put(`${apiUrl}/api/ParkingPasses/${id}`, data); 
}
export async function deleteExhibitorParking(id){
    console.log(id)
    return await axios.delete(`${apiUrl}/api/ParkingPasses/${id}`); 
}