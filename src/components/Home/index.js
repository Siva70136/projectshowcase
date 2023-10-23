import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const Home = () => {
  const [data, setData] = useState([])
  const [category, setCategory] = useState(categoriesList[0].id)
  const [load, setLoad] = useState(false)
  const [success, setSuccess] = useState(true)

  const getData = async () => {
    setLoad(true)
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
    )
    if (response.ok) {
      const d = await response.json()
      setData(d.projects)
      setSuccess(true)
      setLoad(false)
    } else {
      setSuccess(false)
      setLoad(false)
    }
  }
  const change = e => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    getData()
  }, [category])

  console.log(category)

  return (
    <div className="main-container">
      <div className="app-container">
        <div className="header-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
              className="logo"
              alt="website logo"
            />
          </div>
        </div>
        <div className="search-container">
          <select className="search" onChange={change}>
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
        <div className="loader">
          {load && (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
            </div>
          )}
        </div>
        <div>
          {success ? (
            <ul className="card-container">
              {data.map(each => (
                <li className="card" key={each.id}>
                  <img src={each.image_url} className="image" alt={each.name} />
                  <div className="data-container">
                    <p>{each.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="">
              <img
                src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
                className="logo"
                alt="failure view"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <button onClick={getData}>Retry</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
