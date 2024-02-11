const createInputs = () => {
  document.querySelector('div#create-monster').innerHTML = `
    <form id='monster-form'>
      <input style='margin: 0' id='name' placeholder='name...'>
      <input style='margin: 0' id='age' placeholder='age...'>
      <input style='margin: 0' id='description' placeholder='description...'>
      <button>Create</button>
    </form>
  `
}

const getAllMonsters = () => {
  let limit = 50
  let page = 1
  getPageData(limit, page)
  displayMonstersByPage(limit, page)
}

const getPageData = (limit, page) => {
  document.querySelector('div#monster-container').innerHTML = ''
  fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
  .then(res => res.json())
  .then(monsters => monsters.forEach(monster => renderMonster(monster)))
}

const displayMonstersByPage = (limit, page) => {
  const forward = document.querySelector('button#forward')
  const backward = document.querySelector('button#back')

  forward.addEventListener('click', () => {
    if(page > 1) {
      page -= 1
      getPageData(limit, page)
    }
  })

  backward.addEventListener('click', () => {
    if(page < 21) {
      page += 1
      getPageData(limit, page)
    }
  })
}

const renderMonster = avatar => {
  let div = document.createElement('div')
  div.innerHTML = `
    <h2>${avatar.name}</h2>
    <h4>${avatar.age}</h4>
    <p>${avatar.description}</p>
  `
  document.querySelector('div#monster-container').appendChild(div)
}

const addNewMonsterToDB = newMonster => {
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newMonster)
  }).then(res => res.json())
  .then(monster => {
    console.log(monster)
    renderMonster(monster)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  createInputs()
  getAllMonsters()
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    const newMonster = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value
    }
    addNewMonsterToDB(newMonster)
  })
})