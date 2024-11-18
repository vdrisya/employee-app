import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosinterceptor';

const Home = () => {

    // const courses = [
    //     {
    //         courseId: 101,
    //         courseName: "Full Stack Web Development",
    //         courseCategory: "Six month program",
    //         courseDescription: "A comprehensive course covering both front-end and back-end development using MERN stack.",
    //         courseImage: 'https://swansoftwaresolutions.com/wp-content/uploads/2020/04/05.14.20-Meet-a-Full-Stack-Developer-Vlad-Ryba.jpg',
    //         courseFee: 4999
    //     },
    //     {
    //         courseId: 102,
    //         courseName: "Data Science and Analytics",
    //         courseCategory: "Industry readiness program",
    //         courseDescription: "Learn the basics of data science, analytics techniques, and data visualization tools.",
    //         courseImage: 'https://datafloq.com/wp-content/uploads/2022/12/What-Is-Data-Science-And-How-To-Become-A-Data-Scientist.jpg',
    //         courseFee: 5999
    //     },
    //     {
    //         courseId: 103,
    //         courseName: "Cybersecurity Fundamentals",
    //         courseCategory: "Upskilling program",
    //         courseDescription: "An introductory course on cybersecurity principles, network security, and risk management.",
    //         courseImage: "https://firewall.firm.in/wp-content/uploads/2020/08/Cybersecurity-Best-Practices-for-Small-Businesses-2048x1158.jpg",
    //         courseFee: 4500
    //     },
    //     {
    //         courseId: 104,
    //         courseName: "Mobile App Development",
    //         courseCategory: "Industry readiness program",
    //         courseDescription: "Master mobile app development for both Android and iOS using React Native.",
    //         courseImage: "https://www.techkul.com/wp-content/uploads/2020/02/mobile-app-9.png",
    //         courseFee: 5500
    //     },
    //     {
    //         courseId: 105,
    //         courseName: "Cloud Computing with AWS",
    //         courseCategory: "Six month program",
    //         courseDescription: "Gain a deep understanding of cloud computing services with hands-on experience using AWS.",
    //         courseImage: "https://images.squarespace-cdn.com/content/v1/60cfd646701da4034512a1c5/ca3d678a-cbfc-4c9c-bc79-9d3be9fb907e/AWS-Cloud.png",
    //         courseFee: 6500
    //     }
        
    // ]
    const [employee,setEmployee]=useState([])
    
          useEffect(()=>{
            axiosInstance.get('http://localhost:3000/employee/').then((res)=>{
                setEmployee(res.data)
            })
           
          })
          
          const handleDelete = (_id) => {
            axiosInstance.delete(`http://localhost:3000/employee/delete/${_id}`)
                .then((res) => {
                    
                    setEmployee(employee._id);
                    console.log(alert('are you sure'))
                     window.location.reload();
                })
                .catch((err) => {
                    console.error("Error deleting employee:", err);
                });
        };
        const navigate=useNavigate()
        const handleUpdate=(employee)=>{
            navigate('/add',{state:{employee}})    //update clicked then  navigate to add.js
            


            // axios.put(`http://localhost:3000/course/edit/${_id}`,course)
            //     .then((response) => {
                    
            //       console.log(response.data);
            //       setCourse({
                    
            //       })
            //     })
            //     .catch((error) => {
            //       console.error(error);
            //     });
        }
        
        
        
const user=localStorage.getItem("username")
    return (
        
        <>
        <Grid container spacing={3} sx={{ padding: 2 }}>
            {employee.map((employee) => (
                <Grid item xs={12} sm={6} md={4} key={employee.employeeId}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            image={employee.employeeImage}
                            title={employee.employeeName}
                        />
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}}>
                                {employee.employeeName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                               Category: {employee.employeeCategory}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            Employee Fee: {employee.employeeFee} INR 
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                {employee.employeeDescription}
                            </Typography>
                            <Button variant="contained" sx={{ backgroundColor:'#F95454'}}  onClick={() => handleDelete(employee._id)}>DELETE</Button>
                            <Button variant="contained" onClick={() => handleUpdate(employee)}>EDIT</Button>


                        </CardContent>
                        <CardActions>
                            <Button size="small">Read more</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>   
        </>
    )
}

export default Home;
