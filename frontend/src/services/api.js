//axios - http request handler
//frontend - backend közötti összes kommunikáció kezelése
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000"

})

export default api;



