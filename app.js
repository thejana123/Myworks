const { json } = require('body-parser');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const userNames = require('./models/name');
const User=require('./models/users');
const Item=require('./models/todoItems');
const bcrypt= require('bcrypt');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const session=require('express-session');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const path = require('path');

const PORT=process.env.PORT || 5000;;
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:5000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

try {
    mongoose.connect('mongodb+srv://thejana123:theba1234@cluster0.p8lizei.mongodb.net/user_data?retryWrites=true&w=majority',{ useUnifiedTopology: true });
    const db=mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("successfully Connected to the mongo");
});
} catch (error) {
    console.log(error);
}


app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.use(cors({
//   origin:"http://localhost:5000",
//   credential:true
// }))
app.use(session({
  secret:"nermo",
  resave:false,
  saveUninitialized: true
}))
app.use(cookieParser('nermo'))

app.use(passport.initialize());
app.use(passport.session());




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  passport.serializeUser(function(user,done){
      done(null,user.id)
  });

  passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
      done(err,user);
    })
  })
  

  passport.use(new localStrategy(
    {
      usernameField:'Name',
      passwordField:'Password'
  },
    function(username,password,done){
    User.findOne({Username:username},function(err,user){
      if (err)  return done(err);
      if (!user) return done(null,false,{message:'Incorrect Username',status:false});

      bcrypt.compare(password,user.Password,function(err,res){
          if(err) return done(err);
          if(res===false) return done(null,false,{message:'Incorrect password',status:false});
          console.log(user);
          return done(null,user,{message:'success',status:true});
          

      })
    })
  }))



app.post('/add',(req,res)=>{
    
   const User=req.body.User;
   const Todo=req.body.Todo;
   const Flag=req.body.Flag;

   const item=new Item({username:User,item:Todo,flag:Flag})
   item.save((err,item)=>{
     if(err) {res.send(err);
    }else{
      console.log(item);
      res.send(item);
    }

   })
})

app.post('/items', async (req, res) => {

    const user=req.body.user;
    const flag=req.body.flag;
    console.log(req.body);
    const items = await Item.find({username:user,flag:flag},{_id:0});
    console.log(items);
  
    try {
      res.send(items);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  app.post('/doneItems', async (req, res) => {

    const user=req.body.user;
    const flag=req.body.flag;
    console.log(req.body);
    const items = await Item.find({username:user,flag:flag},{_id:0});
    console.log(items);
  
    try {
      res.send(items);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  app.post('/userData',async (req,res)=>{
    
    const email=req.body.Email;
    const username=req.body.Name;
    const password=req.body.Password;
    
    const saltRounds=10;
    bcrypt.genSalt(saltRounds,function(err,salt){
      if(err) return (err);
      bcrypt.hash(password,salt, function(err,hash){
        if(err) return(err);
        console.log(hash);
        const Usr= new User({Email:email,Username:username,Password:hash});
        Usr.save((error,book)=>{
          if(error){
            console.log(error);
          }
          else{
            res.status(200).send(true);
            console.log("success");
            console.log(book);
          }
        })

      })
          })

  })


  app.post('/login', async (req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
      if(err) res.send({info:info});
      if(!user) res.send({info:info});
      else{
        req.login(user,(err)=>{
          if(err) console.log(err); 
          res.send({user:req.user,info:info});
          console.log(info.status);
        })
      }
    })
    (req,res,next)
  })

  app.post('/updateDone',async (req,res,next)=>{
    const user=req.body.user;
    const flag=req.body.flag;
    const item=req.body.item[0];
 
    try {
      const result=await Item.updateOne({username:user,item:item},{$set:{flag:flag}});
      console.log(result);      
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  })

  app.post('/deleteItem',async (req,res,next)=>{
    const user=req.body.user;
    const item=req.body.item[0];
 
    try {
      const result=await Item.deleteOne({username:user,item:item});
      console.log(result);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  })

  app.use(express.static(path.join(__dirname, './client/build')));

//   app.use(express.static(__dirname + '/public/'));
//   if (process.env.NODE_ENV == 'production') {
//     app.use(express.static('client/build'));
//     // app.use(express.static(path.join(__dirname, 'client', 'build')));
//     // app.use('*', express.static(path.join(__dirname, "client", "build")));
    
//  }

 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});



app.listen(PORT,()=>{
    console.log(`server is active on ${PORT}` );
})

