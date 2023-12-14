const API_URL = `https://polar-chartreuse-silverfish.glitch.me/`
const table = document.createElement('table')
table.classList.add('user-table')

const vipCheckbox = document.createElement('input')
vipCheckbox.type = 'checkbox'
vipCheckbox.id = 'vipFilter'
vipCheckbox.addEventListener('change', handleVipFilter)
const vipLabel = document.createElement('label')
vipLabel.innerHTML = ' Show VIP only'
vipLabel.setAttribute('for', 'vipFilter')

const searchForm = document.createElement('form')
const searchInput = document.createElement('input')
searchInput.type = 'search'
searchInput.id = 'searchInput'
searchInput.placeholder = 'Search...'
const searchButton = document.createElement('button')
searchButton.type = 'button'
searchButton.innerHTML = 'Click'
searchButton.addEventListener('click', handleSearch)

document.body.appendChild(vipCheckbox)
document.body.appendChild(vipLabel)
document.body.appendChild(document.createElement('br'))
document.body.appendChild(searchForm)
searchForm.appendChild(searchInput)
searchForm.appendChild(searchButton)

let data

const headerRow = document.createElement('tr')
headerRow.innerHTML = `
  <th>ID</th>
  <th>Photo</th>
  <th>Name</th>
  <th>Last Name</th>
  <th>City</th>
  <th>Favourite Color</th>
`
table.appendChild(headerRow)

fetch(API_URL)
  .then(response => response.json())
  .then(apiData => {
    data = apiData
    data.forEach(user => {
      const [firstName, lastName] = user.name.split(' ')

      const row = document.createElement('tr')
      row.id = `user-${user.id}`
      row.innerHTML = `
        <td>${user.id}</td>
        <td><img src="${user.image}" alt="${firstName}'s Photo" style="width: 50px; height: 50px;"></td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${user.city}</td>
        <td>${user.fav_color}</td>
      `
      table.appendChild(row)
    })

    document.body.appendChild(table)
  })
  .catch(error => console.error('Error fetching data:', error))

function handleVipFilter() {
  const showVipOnly = vipCheckbox.checked

  data.forEach(user => {
    const row = document.querySelector(`#user-${user.id}`)
    if (showVipOnly) {
      row.style.display = user.vip ? '' : 'none'
    } else {
      row.style.display = ''
    }
  })
}

function handleSearch() {
  const searchString = searchInput.value.toLowerCase()

  data.forEach(user => {
    const row = document.querySelector(`#user-${user.id}`)
    const fullName = `${user.name} ${user.city}`.toLowerCase()
    row.style.display = fullName.includes(searchString) ? '' : 'none'
  })
}
