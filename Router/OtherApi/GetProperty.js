const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');
const { json } = require('body-parser');
function uniqid(){
    return Math.random().toString(16).slice(2);
  }

router.get('/get_propertys',async (req,res)=>{
     const {property_id,user_id} = req.body

    // if(user_id == undefined || user_id ==""){
    //   res.send({message:'user id Required'})
    //  }
    // else{
     let data = await  Users.find()
      // Uptown , Mountains , Beach , River , Ecotourism 
      let myARray = []
      let propertydata = data.filter(item => {
        let stringData = JSON.stringify(item)
        const {_id , ...rest } = JSON.parse(stringData)
        if(rest?.property_list){
          myARray = [...rest?.property_list]
        }
      })
    //   console.log('propertys data ',myARray)
    let filterData = myARray.filter(item => item.property_id == property_id)

     res.send({message:filterData})
   
//   }
 }
  )
module.exports = router