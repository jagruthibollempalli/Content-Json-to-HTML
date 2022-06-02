



let data = "";
let apiUrl ="https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/_hierarchy.json"
async function getJson(url) {
let response = await fetch(url);
let jsondata = await response.json()
return jsondata;
}

// function WriteFile()
// {
//    var Scr = new ActiveXObject("Scripting.FileSystemObject");
//    var CTF = Scr.CreateTextFile("example.html", true, true);
//    CTF.WriteLine("hello");
//    CTF.Close();
// } 

              
async function tagfunction(tagid) {
    data = await getJson(apiUrl)
    // console.log(data);
    const units= []
const modules = []
const pages =[]
const dir = {}
for(var u in data.children) {
    // console.log(u)
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
            var nl = []
            var url = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idrefval+'.json'
            // console.log(url)
            var pagedata = await getJson(url)
            //console.log(pagedata);
           
            p.push(pagedata.title)
            dir[idrefval]=pagedata.title
            if(nl.includes(pagedata.title)== false){
                // dir[idrefval]=pagedata.title
                // console.log(pagedata)
                // click(pagedata)
                // var c = document.getElementById(pagedata.title);
                // console.log(c)
                // for(var i = 0;i<=pagedata.content.model.length-1;i++){
                //    if(pagedata.content.model[i].type=='content'){
                //        var k = pagedata.content.model[i].children
                //        for(var j in k){
                //         text = k[j].children
                //         for(var le =0;le<= text.length-1;le++){
                //             console.log(text[le])
                //             var d = document.createElement('p');
                //             console.log(text[le].text)
                //             d.innerText = text[le].text;
                //             // c.appendChild(d);
                        
                //         }
                        
                //         }
                //    }
                // //   c.appendChild(d);
                // }      
                }              
        }
        page.push(p)
    }
    modules.push(mod)
    pages.push(page)
    
}
 console.log(dir)
 console.log(tagid)

idref = tagid
console.log(idref)
var url = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idref+'.json'

var pagedata = await getJson(url)
console.log(pagedata)
var c = document.getElementById(dir[tagid]);
// console.log(c)
for(var i = 0;i<=pagedata.content.model.length-1;i++){
    if(pagedata.content.model[i].type=='content'){
        var k = pagedata.content.model[i].children
        console.log(k)
        for(var j in k){
            console.log(typeof k[j].type)
        text = k[j].children
        for(var le =0;le<= text.length-1;le++){
            console.log(text[le])
            
            var d = document.createElement(k[j].type);
            console.log(text[le].text)
            d.innerText = text[le].text;
            c.appendChild(d);
        
        }
        
        }
    }
//   c.appendChild(d);
}  
}

tagfunction();
        