const apiURL = 'https://jsonplaceholder.typicode.com/users?fbclid=IwAR2jsCg6biiOQDVs0FauNUEg0p81U6F_xW8nqhP0u8UW0oru_qmwrv3UeAQ'
const dataWrap = document.querySelector("#dataWrap")
// const thead = document.querySelector('#te')
let formHeaders =["Id", "Name", "Username", "Email", "Address", "Phone", "Website", "Company"]
let address = ["street", "suite", "city", "zipcode" ]
let company = ["name", "catchPhrase", "bs"]

const createMyElement = (parent, ele, txt, scope) => {
  const element = 
  scope? `<${ele} scope = "row"> ${txt} </${ele}>`:
  txt? `<${ele}> ${txt} </${ele}>` : `<${ele}></${ele}>`
  parent.insertAdjacentHTML('beforeend', element)
  return element
}


const drawTable = () => {
  const tr = document.createElement('tr')
    dataWrap.appendChild(tr)
  formHeaders.forEach(txt => {
    createMyElement(tr, "th", txt, "col")
  })
}
drawTable()

const add = (arr, obj)=>{
  let txt = ''
  arr.forEach((o, i) => {
    i == arr.length - 1? txt += obj[o] :
    txt += obj[o] + ' - '
  })
  return txt
}

const draw = (usersData = []) =>{
  if( !usersData.length ){
   createMyElement(dataWrap, "tr", "No Users Yet")
  }
  usersData.forEach(user => {
    const tr = document.createElement('tr')
    dataWrap.appendChild(tr)
    formHeaders.forEach(h =>{
      h == 'Id'? createMyElement(tr, "th", user[h.toLowerCase()], "row"):
      h == 'Address'? createMyElement(tr, "td", add(address, user[h.toLowerCase()]), null):
      h == 'Company'? createMyElement(tr, "td", add(company, user[h.toLowerCase()]), null):
      createMyElement(tr, "td", user[h.toLowerCase()], null)
    })
  })
}

fetch(apiURL).then( res => {
  return res.json();
}).then(data => {
    draw(data)
}).catch(e =>{
  console.log(e)
})
