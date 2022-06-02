



let data = "";
let apiUrl ="https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/_hierarchy.json"
async function getJson(url) {
let response = await fetch(url);
let jsondata = await response.json()
return jsondata;
}
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

              
async function main() {
    data = await getJson(apiUrl)
    console.log(data);
    const units= []
const modules = []
const pages =[]
const dir = {}
const project=[]
const pagehtml=[]
for(var u in data.children) {
    console.log(u)
    const mod = []
    const page=[]
    const phtml=[]
    units.push(data.children[u].title)
    for(var m in data.children[u].children){
        console.log(data.children[u].children)
        if('title' in data.children[u].children[m]){
        mod.push(data.children[u].children[m].title)
        }
        else{
            // str = data.children[u].title
            // project = str.replace('[Project]', '');
            // mod.push("<li style='color:blue;font-size:smaller;list-style:square'><a href='#'>"+project+"</li>")
            var idrefval = data.children[u].children[m].idref
            var url = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idrefval+'.json'
            // console.log(url)
            var pagedata = await getJson(url)
            //console.log(pagedata);
            project.push(pagedata.title)
            var pname = pagedata.title+'_'+idrefval
            dir[pname]=pagedata.title
            mod.push(pagedata.title)
           

        }
        const p = []
        const ph=[]

        for(var pa in data.children[u].children[m].children){
            // console.log(data.children[u].children[0])
            // console.log(data.children[u].children[m].children[0])
            var idrefval = data.children[u].children[m].children[pa].idref
            console.log(data.children[u].children[m].children[pa])
            
            var url = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idrefval+'.json'
            // console.log(url)
            var pagedata = await getJson(url)
            //console.log(pagedata);
           
            p.push(pagedata.title.trim())
            var pname = pagedata.title+'_'+idrefval
            dir[pname]=pagedata.title
            ph.push(pname)
            
        }
        page.push(p)
        phtml.push(ph)
    }
    modules.push(mod)
    pages.push(page)
    pagehtml.push(phtml)
    
}
console.log(pages)
console.log(dir)
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
        if(project.includes(modules[i][j])==true){
            var keyval = getKeyByValue(dir,modules[i][j])
            dd.innerHTML= "<a href='"+keyval+".html'>"+modules[i][j]+ "</a>"
            dd.setAttribute("class", "democlass");
        }
        else{
            dd.innerHTML = modules[i][j];
            dd.setAttribute("class", "dclass");
        }
        dt.appendChild(dd);
        for(k = 0;k<=pages[i][j].length-1;k++){ 
            var p = document.createElement('li')
            p.innerHTML= "<a href='"+pagehtml[i][j][k].trim()+".html'>"+pages[i][j][k]+ "</a>"
            console.log("<a href='"+pagehtml[i][j][k].trim()+".html'>"+pages[i][j][k]+ "</a>")
            p.setAttribute("class", "democlass");
            dd.appendChild(p)
        }

    }    
        
}

cont.appendChild(dl);       
}

main();
        