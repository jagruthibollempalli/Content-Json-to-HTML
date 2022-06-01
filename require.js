
// import {fs } from 'fs';


let data = "";
let apiUrl ="https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/_hierarchy.json"
async function getJson(url) {
let response = await fetch(url);
let jsondata = await response.json()
return jsondata;
}
function WriteFile()
{
   var Scr = new ActiveXObject("Scripting.FileSystemObject");
   var CTF = Scr.CreateTextFile("example.html", true, true);
   CTF.WriteLine("hello");
   CTF.Close();
}

async function main() {
    data = await getJson(apiUrl)
    console.log(data);
    const units= []
const modules = []
const pages =[]
for(var u in data.children) {
    console.log(u)
    const mod = []
    const page=[]
    units.push(data.children[u].title)
    for(var m in data.children[u].children){
        
        if('title' in data.children[u].children[m]){
        mod.push(data.children[u].children[m].title)
        }
        else{
            str = data.children[u].title
            project = str.replace('[Project]', '');
            mod.push("<li style='color:blue;font-size:smaller;list-style:square'><a href='#'>"+project+"</li>")
        }
        const p = []
        for(var pa in data.children[u].children[m].children){
            // console.log(data.children[u].children[0])
            // console.log(data.children[u].children[m].children[0])
            var idrefval = data.children[u].children[m].children[pa].idref
            var nl = ['Pre-Test','Overview','Post-Test']
            var url = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idrefval+'.json'
            // console.log(url)
            var pagedata = await getJson(url)
            //console.log(pagedata);
            p.push(pagedata.title)
            if(nl.includes(pagedata.title)== false){
                console.log(pagedata)
                // var myFile = new File(["<html><body><h1></h1>hello</body></html>"], "demo.html", {type: "text/plain;charset=utf-8"});
                // saveAs(myFile);
                
                var fs = require('fs');
                fs.open('./newfile_3.html', 'w', function (err, file) {
                  if (err) throw err;
                  console.log('File is opened in write mode.');
                });
                                
                }
            
        }
        page.push(p)
    }
    modules.push(mod)
    pages.push(page)
    
}
console.log(pages)
var cont = document.getElementById('container');
var dl = document.createElement('dl');
let list = document.getElementById("myList");
for (i = 0; i <= units.length - 1; i++) {
var dt = document.createElement('dt');
dt.innerHTML = units[i]; 
dt.setAttribute("class", "d1class");        
dl.appendChild(dt);
for(j = 0;j<=modules[i].length-1;j++) {
    var dd = document.createElement('dd');
    dd.innerHTML = modules[i][j];
    dd.setAttribute("class", "dclass");
    dt.appendChild(dd);
    for(k = 0;k<=pages[i][j].length-1;k++){ 
        var p = document.createElement('li')
        p.innerHTML= "<a href='#'>"+pages[i][j][k]+ "</a>"
        p.setAttribute("class", "democlass");
        dd.appendChild(p)
    }

}    
        
}
cont.appendChild(dl); 
}

main();
        