const mongoose = require("mongoose");
const validator = require("validator");

//connection creation and creating a new database
mongoose.connect("mongodb://localhost:27017/database1",{useNewUrlParser: true,useUnifiedTopology : true})
.then( ()=>console.log("connection succesfull"))
.catch( (err) =>console.log(err));

//Create a schema 
//A mongoose scehema means to define the strucure of document,default value or validator//
var playlistSchema = new mongoose.Schema({ 
    name:
     {
             type: String, required: true 
    },
    ctype : String,
    videos :
    {
     type:Number,
     //Custom Validation
       // validate(value)
        // {
          //  if(value < 0)
            //throw new error('value must be negative');
        
    },
    author:String,
    email:
    {
       type : String,
       required  :true , 
       unique : true,
       validate(value)
       {
        if(validator.isEmail(value))
        {
            throw new Error("Email is inValid");
        }
       }

    },
    active : Boolean,
    date : 
    {
            type:Date,
            default:Date.now
    }
})

//Create a collection like table in database1
const Playlist = new mongoose.model("Playlist",playlistSchema);

//create a document in a Playlist collection
//document 1 reactPlaylist
const createDocument = async ()=>
{
        try
        {
            /*const jsPlaylist = new Playlist(
                {
                    name : "javascript JS",
                    ctype : "front end",
                    videos : 120,
                    author :"Hinal",
                    active : true
                
                })
                const mongoPlaylist = new Playlist(
                    {
                        name : "Mongo DB",
                        ctype : "Back end",
                        videos : 20,
                        author :"Hinal",
                        active : true
                    
                    })
                    const mongoosePlaylist = new Playlist(
                        {
                            name : "mongoose DB",
                            ctype : "Back end",
                            videos : 50,
                            author :"Hinal",
                            active : true
                        
                        })
            */
           const javaPlaylist =  new Playlist(
            {
                name : "java Programming",
                ctype : "Language",
                videos:400,
                author:"Hinal",
                email : "hinal",
                active:true

            }
           )
            const result = await Playlist.insertMany([javaPlaylist])
            console.log(result);
        }
        catch(err)
        {
                console.log(err);
        }
    
}

createDocument(); 
//......============================================........//
//Read Document
    const getDocument = async() =>
    {
        try
        {
            const result = await Playlist
            .find()
            .select({name:1})
           .sort({name:-1});
            console.log(result)
        }
        catch(err)
        {
                console.log(err);
        }
         
    }
    //getDocument();

//UPDATE DOCUMENT
const updateDocument = async (_id)=>
{
        try{
                const result = await Playlist.findByIdAndUpdate({_id},
                    {
                        $set:{name:"Javascript"}

                    },
                    {
                        new :true
                    
                    });
                    console.log(result);
        }
        catch(err)
        {
            console.log(err);
        }
    
}

//updateDocument("62c97cea0c806e428d87d769")

//Delete Document

const deleteDocument =  async(_id) =>
{
    try{
            const result = await Playlist.findByIdAndDelete({_id});
                console.log(result)
    }
    catch(err)
    {
            console.log(err);
    }
}
  //  deleteDocument("62c97cea0c806e428d87d76a")

    //COMPARISON OPERATOR
         /* try
        {
            const result = await Playlist
            .find({ctype:{$in:["Back end","Front end"]}})
            .select({name:1})
       // .limit(1);
            console.log(result)
        }*/
//OR OPERATOR IN MONGOOSE

/*Perform an operation on two or more array in expression so the document satisfy any one expression this
that time or operator is used.*/
/*
const getDocument = async() =>
    {
        try
        {
            const result = await Playlist
            .find({$or : [{ctype:"Back end"},{author:"Hinal"}]})
            .select({name:1})
           // .limit(1);
            console.log(result)
        }
        catch(err)
        {
                console.log(err);
        }
         
    }

//And operation
const result = await Playlist
            .find({$and : [{ctype:"Back end"},{author:"Hinal"}]})
            .select({name:1})
           // .limit(1);
            console.log(result)
===========================================================*/
//Count document of which have author hinal and ctype is back end


/*try
        {
            const result = await Playlist
            .find({$and : [{ctype:"Back end"},{author:"Hinal"}]})
            .select({name:1})
           .countDocuments();
            console.log(result)
        }
*/

/*count all the documents in the folder

try
        {
            const result = await Playlist
            .find({author:"Hinal"})
            .select({name:1})
           .countDocuments();
            console.log(result)
        }

*/

//Sorting the Playlist

/*try
        {
            const result = await Playlist
            .find({author:"Hinal"})
            .select({name:1})
           .sort()
            console.log(result)
        }
*/












/*
const UserSchema =  new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    }
    ctype : numbers,
    author :String,
    active : Boolean
})

//==================================================//



//=================================================//
//module create meand =>create collection 
///const Usertable = new mongoose.model("Usertable",UserSchema);

//create a document
const UserDocument  = async () =>
{
    try
{    
const user1  =  new Usertable
(
    {
        name:"hinal",
        ctype : "ackemd",
        author:"dsf",
        active:true       
    }
)
 const RESULT=await user1.save()
 console.log(result)

}
catch(err)
{
    console.log(err)
}

}
*/