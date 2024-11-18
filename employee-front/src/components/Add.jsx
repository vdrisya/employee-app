import { Button, MenuItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

const Add = () => {
    // array and function for drop down menu
    // const courseCategories = [
    //     { value: 'irp', label: 'Industry Readiness Program' },
    //     { value: 'smp', label: 'Six Month Program' },
    //     { value: 'upskilling', label: 'Upskilling Program' },
    //   ];
    //   const [category, setCategory] = useState('');

    //   const handleChange = (event) => {
    //     setCategory(event.target.value);
    //     fetchValue(event);     
    //   };





      //array and function to submit data
      const[employee,setEmployee]=useState({employeeName:'',employeeDescription:'',employeeCategory:'',employeeId:'',employeeFee:''})

      const fetchValue=(event)=>{
      setEmployee({...employee,[event.target.name]: event.target.value});
      }
      
  



      
      const Navigate=useNavigate()
      const location=useLocation()
      const sendData=()=>{
        if(location.state!=null){
          axiosInstance.put('http://localhost:3000/employee/edit/'+location.state.employee._id,employee)
          .then((res)=>{
            alert('Data updated');
            Navigate('/home')

          }).catch((error)=>{
            console.log(error);
          })
        }
        else{
          axiosInstance.post('http://localhost:3000/employee/addEmployee',employee).then((res)=>{
            Navigate('/home')
          }).catch((error)=>{
            console.log(error)
          })
        }

      }
      useEffect(()=>{
        if(location.state!=null){
          setEmployee({
            ...employee,
            employeeId:location.state.employee.employeeId,
            employeeName:location.state.employee.employeeName,
            employeeCategory:location.state.employee.employeeCategory,
            employeeDescription:location.state.employee.employeeDescription,
            employeeFee:location.state.employee.employeeFee,
            employeeImage:location.state.employee.employeeImage

          })
        }
      },[])

     return (
      <div>
        <br />
        <h2>Add Employee</h2><br />
        <TextField id="outlined-basic" label="Employee ID" variant="outlined"onChange={fetchValue} name="employeeId" value={employee.employeeId} /><br />
        <TextField  id="outlined-basic" label="Employee Name" variant="outlined" onChange={fetchValue} name="employeeName" value={employee.employeeName} /><br />
    
        <TextField id="outlined-basic"  label="Employee Category"  onChange={fetchValue} variant="outlined" value={employee.employeeCategory} name="employeeCategory" >
        
      
        </TextField><br />
        <TextField
        fullWidth 
          id="outlined-textarea-basic"
          label="Employee Description"
          multiline onChange={fetchValue} value={employee.employeeDescription} name="employeeDescription"/><br />
        <TextField  id="outlined-basic" label="Employee Fee" variant="outlined" value={employee.employeeFee} onChange={fetchValue} name="employeeFee" /><br />
        <TextField  id="outlined-basic" label="Employee image" variant="outlined" onChange={fetchValue} name="employeeImage" value={employee.employeeImage} /><br /><br />
        <Button variant="contained" sx={{backgroundColor:'#96D0E2',color:'white', margin:2}} onClick={sendData}>Add Employee</Button>
    </div>
  )
}

export default Add