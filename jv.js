// const fs = require("fs");

// fs.writeFile("sample.txt", "Writing content", (err) => {
//    if (err) throw err;
//    console.log("Completed!");
// });




let data = "";
let apiUrl ="https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/_hierarchy.json"
async function getJson(url) {
let response = await fetch(url);
let jsondata = await response.json()
return jsondata;
}



data = require("C:/Users/jagru/OneDrive/Desktop/msit/DESKFILES/MSIT/New folder/export_functions/_hierarchy.json");
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
            var url = "C:/Users/jagru/OneDrive/Desktop/msit/DESKFILES/MSIT/New folder/export_functions/" +idrefval+".json"
            // console.log(url)
            var pagedata = require(url);
            //console.log(pagedata);
            p.push(pagedata.title)
            if(nl.includes(pagedata.title)== false){
                console.log(pagedata)
                // var myFile = new File(["<html><body><h1></h1>hello</body></html>"], "demo.html", {type: "text/plain;charset=utf-8"});
                // saveAs(myFile);
                
                var fs = require('fs');
                let data = "<html><head><script src ='page.js'></script></head><body><div id ='"+pagedata.title+"'><script>tagfunction('"+pagedata.title+"')</script></div></body></html>"
                fs.writeFile(pagedata.title+'.html',data, function (err, file) {
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


