const express = require('express')
const User = require('../models/user.schema')
const router = express.Router()



// Example usage
const arrayOfPeople = [
    { name: 'mary', age: 25, email:'mary@gmail.com' },
    { name: 'salma', age: 35, email:'salma@gmail.com' },
    { name: 'sami', age: 28, email:'sami@gmail.com' },
    { name: 'marwa', age: 30, email:'marwa@gmail.com' },
    { name: 'jihan', age: 22, email:'jihan@gmail.com' },
    { name: 'nada', age: 18, email:'nada@gmail.com' },
];

//add array of peaople
router.get('/add-users', (req, res) => {
    User.insertMany(arrayOfPeople)
        .then(() => res.send("Users saved successfully!"))
        .catch((err) => console.log(err));
});


//GET : get All users 

router.get('/get-users', (req, res) => {

    User.find()
        .then((data) => res.json(data))
        .catch((err) => console.log('Error:', err));
});

const fakeData = {
    name: 'Mary',
    age: 20,
   email: 'Mary@gmail.com'
}

//   POST :  ADD A NEW USER TO THE DATABASE

router.post('/add-user', (req, res) => {
    const newPerson = new User(fakeData)
    newPerson.save()
        .then(() => res.send("user saved success!!"))
        .catch((err) => console.log(err))
})


//PUT : EDIT A USER BY ID 

router.put('/update-user/:id',(req,res)=>{
    id = req.params.id
   User.findByIdAndUpdate(
    { _id: id },
    { age: 50 },
    { new: true }
)
.then((updatedUser) => {
    res.status(200).json(updatedUser);
})
.catch((err) => {
    console.log('err', err);
    res.status(500).json({ error: 'An error occurred' });
});

   })

   //   DELETE : REMOVE A USER BY ID 

   router.delete('/delete-user/:id', (req, res) => {
    const id = req.params.id

    User.findByIdAndDelete({ _id: id })
        .then(() => res.send('user deleted successfuly'))
        .catch((err) => console.log('err', err))
})


module.exports = router