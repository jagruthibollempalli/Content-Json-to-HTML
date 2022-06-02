



let data = "";
let apiUrl ="https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/_hierarchy.json"
async function getJson(url) {
let response = await fetch(url);
let jsondata = await response.json()
return jsondata;
}
            
async function tagfunction(tagid) {
    data = await getJson(apiUrl)
    // console.log(data);
    const units= []
const modules = []
const pages =[]
const dir = {}
const project=[]
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
            // str = data.children[u].title
            // project = str.replace('[Project]', '');
            // mod.push("<li style='color:blue;font-size:smaller;list-style:square'><a href='#'>"+project+"</li>")
            var idrefval1 = data.children[u].children[m].idref
            var url1 = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idrefval1+'.json'
            // console.log(url)
            var pagedata1 = await getJson(url1)
            //console.log(pagedata);
            project.push(pagedata1.title)
            dir[idrefval1]=pagedata1.title
            mod.push(pagedata1.title)
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
var url2 = 'https://raw.githubusercontent.com/jagruthibollempalli/Content-Json-to-HTML/main/Json_content/functions/'+idref+'.json'

var pagedata2 = await getJson(url2)
console.log(pagedata2)
var c = document.getElementById(dir[tagid]+'_'+idref);
// console.log(c)
for(var i = 0;i<=pagedata2.content.model.length-1;i++){
    if(pagedata2.content.model[i].type=='content'){
        var k = pagedata2.content.model[i].children
        console.log(k)
        for(var j in k){
            console.log(typeof k[j].type)
        text = k[j].children
        
        for(var le =0;le<= text.length-1;le++){
            console.log('children' in k[j].children[le])
           
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
        