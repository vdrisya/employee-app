import axios from 'axios'
const axiosInstance= axios.create({
    basicURL:'http://localhost:3000/employee/'
})
axiosInstance.interceptors.request.use((config)=>{
    const accessToken=localStorage.getItem("token")
    if(accessToken){
        if(config){
            config.headers.token=accessToken;
        }
    }
    return config;

},(error)=>{
    return Promise.reject(error)
})
export default axiosInstance;