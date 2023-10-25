const express =require('express');
const router =express.Router()
const Users = require('../SignupModule/Signupmodules');
const { json } = require('body-parser');
function uniqid(){
    return Math.random().toString(16).slice(2);
  }

function GetCurrentDate(){
    // Date object
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

// we will display the date as DD-MM-YYYY 

let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
return currentDate;

console.log("The current date is " + currentDate); 

}

router.post('/booking',async (req,res)=>{
    const {property_id,entry_date,exit_date,extra_services,total_amount,tranjectionId,user_id} = req.body

    if(user_id == undefined || user_id ==""){
      res.send({message:'user id Required'})
     }
   else if(property_id == undefined || property_id ==""){
        res.send({message:'property id Required'})
    }
    else if(entry_date == undefined || entry_date ==""){
        res.send({message:'Entry Date Required'})
    }
    else if(exit_date == undefined || exit_date ==""){
        res.send({message:'Exit Date Required'})
    }
    else if(extra_services == undefined || extra_services ==""){
        res.send({message:'Extra Services Required'})
    }
    else if(total_amount == undefined || total_amount ==""){
        res.send({message:'Total Amount Required'})
    }
    else if(tranjectionId == undefined || tranjectionId ==""){
        res.send({message:"Tranjection Id Required"})
    }
    else{
      let data = await Users.find({user_id:user_id})
      let booking_data = JSON.stringify(data[0])
      // console.log("checkkkkkkk ",JSON.parse(booking_data)?.Booking_History)
      let bookingArray = []
      if(JSON.parse(booking_data)?.Booking_History == undefined){
        bookingArray.push({property_id:property_id,booking_date:GetCurrentDate(),entry_date: entry_date,exit_date:exit_date,extra_services:extra_services,total_amount:total_amount,tranjectionId:tranjectionId})
      }
      else{
        bookingArray = JSON.parse(booking_data)?.Booking_History
        bookingArray.push({property_id:property_id,booking_date:GetCurrentDate(),entry_date: entry_date,exit_date:exit_date,extra_services:extra_services,total_amount:total_amount,tranjectionId:tranjectionId})
      }
    await Users.findOneAndUpdate({user_id:req.body.user_id }, 
    { $set: { Booking_History:[...bookingArray]  } }, { //options
          returnNewDocument: true,
          new: true,
          strict: false
        }
      )
    .then((value) => {
      if(value == null){
        res.send({message:'User Not Found'})
      }
      else{
        res.send({message:value})
      }
    })
    .catch((err) => console.log(err))
   
  }
 }
  )
module.exports = router