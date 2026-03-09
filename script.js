let issues=[]

for(let i=1;i<=50;i++){

issues.push({

title:"Fix Navigation Menu "+i,
desc:"Navigation menu does not collapse properly on mobile.",
status:i%4==0?"closed":"open",
priority:["LOW","MEDIUM","HIGH"][i%3],
label:["BUG","HELP WANTED","ENHANCEMENT"][i%3],
author:"Fahim Ahmed",
date:"15 May 2024"

})

}

let current="all"
let currentLabel="all"

function login(){

let u=username.value
let p=password.value

if(u==="admin" && p==="admin123"){

loginPage.style.display="none"
dashboard.style.display="block"

loadIssues()

}else{

loginError.innerText="Invalid login"

}

}

function setTab(type){

current=type

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))

event.target.classList.add("active")

loadIssues()

}

function setLabel(label){

currentLabel=label

loadIssues()

}

search.addEventListener("input",loadIssues)

function loadIssues(){

issuesGrid.innerHTML=""

spinner.style.display="block"

setTimeout(()=>{

spinner.style.display="none"

let data=issues

if(current!="all"){
data=data.filter(i=>i.status===current)
}

if(currentLabel!="all"){
data=data.filter(i=>i.label===currentLabel)
}

let text=search.value.toLowerCase()

data=data.filter(i=>i.title.toLowerCase().includes(text))

count.innerText=data.length+" Issues"

data.forEach(issue=>{

let card=document.createElement("div")

card.className="card "+issue.status

card.innerHTML=`

<h4>${issue.title}</h4>

<p>${issue.desc}</p>

<div class="badges">

<span class="badge priority">${issue.priority}</span>

<span class="badge ${getLabelClass(issue.label)}">${issue.label}</span>

</div>

`

card.onclick=()=>openModal(issue)

issuesGrid.appendChild(card)

})

},500)

}

function getLabelClass(label){

if(label==="BUG") return "bug"
if(label==="HELP WANTED") return "help"
if(label==="ENHANCEMENT") return "enhancement"

}

function openModal(issue){

modal.style.display="flex"

mTitle.innerText=issue.title
mDesc.innerText=issue.desc
mPriority.innerText=issue.priority
mAuthor.innerText=issue.author
mDate.innerText=issue.date
mStatus.innerText=issue.status

mLabel.innerText=issue.label
mLabel.className="badge "+getLabelClass(issue.label)

}

function closeModal(){

modal.style.display="none"

}