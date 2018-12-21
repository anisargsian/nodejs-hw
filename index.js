const fs = require("fs");
const { Writable, Readable, Transform } = require("stream");
const moment = require("moment");

console.log("Hello World!");

const myRS = new Readable({
	read() {}
});
myRS.push("My name is Ani!");

const myWS = new Writable({
	write(chunk) {
	  console.log(chunk.toString());
	}
  }); 
myRS.pipe(myWS);
//process.stdin.pipe(myWS);

const removeSpacesTr = new Transform({
	transform(chunk) {
		this.push(chunk.toString().split(" ").join(''));
	}
})
process.stdin.pipe(removeSpacesTr).pipe(process.stdout);

let ws = fs.createWriteStream("test.txt", "utf8");

setInterval(() => {
	ws.write(moment().format("LTS"), (err) => {
		if(err) throw err;
	})
}, 1000 );  
