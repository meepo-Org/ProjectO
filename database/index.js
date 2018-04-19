let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PM-db');
var db = mongoose.connection;

db.on('error' , function(){
	console.log('mongoose not Connected !')
})
db.once('open' , function () {
	console.log("mongoose conncted !")
})

var projectSchama = mongoose.Schema({
	projectName : String , 
	projectDisc : String
})

var userSchema = mongoose.Schema({
	username :{type : String  , required : true , index : {unique:true} },
	password : {type : String  , required : true } , 
	email : {type : String  , required : true }, 
	project  :[projectSchama]
})

var User = mongoose.model("User" , userSchema);
var Project = mongoose.model("Project" , projectSchama);

var save = function (data , callback) {
	var user = new User(data);
	user.save(function (err , elem) {
		if(err){callback(err, null)}
			callback(null ,elem)
	})
}


module.exports.save = save;
module.exports.User = User;
module.exports.Project = Project;