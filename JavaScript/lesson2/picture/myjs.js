const objects = {
	name:"",
	fun(){},
}
function Objects(name){
	this.name = name;
	this.fun = function (){
		console.log(this.name);
	}
}
const my = new Objects("lw"); 
console.log(my.name);
my.fun();