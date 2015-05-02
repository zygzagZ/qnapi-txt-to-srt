#!/usr/bin/nodejs
/* jslint node: true */
if (process.argv.length < 4) {
	console.error('Wrong arguments provided!');
	return 1;
}
var sub = process.argv[2],
	fps = parseFloat(process.argv[3], 10),
	fs = require('fs'),
	c = fs.readFileSync(sub, 'utf8').trim().split('\n'), // it is really a .txt converted to utf8 from cp1250
	o = '';

function z(i, y) {
        i+='';
        while (i.length < y) {
        	i = '0'+i;
        }
        return i;
}
function getTime(frame) {
	var t = frame / fps;
	return	z(Math.floor(t/3600),2)+ ':'+
			z(Math.floor((t%3600)/60),2)+ ':'+
			z(Math.floor(t%60),2)+ ','+
			z(Math.floor((t%1)*1000), 3);	
}
var iter = 1;
for (var i = 0; i < c.length; i++) {
	var m = c[i].match(/\[([0-9]+)\]\[([0-9]+)\](.*)/);
	if (!m || m.length < 4) {
		console.error('[Wrong format] #'+i+' line contents: "' + c[i] + '"');
		return 1;
	} else {
		o+= (iter++) + '\n'+getTime(parseInt(m[1],10)) + ' --> ' + getTime(parseInt(m[2],10)) + '\n' + m[3].replace(/\|/g, '\n') + '\n\n'; 
	}
}
fs.writeFileSync(sub, o, 'utf8');
console.log('Converted!');
return 0;