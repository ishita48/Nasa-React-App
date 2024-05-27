import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = 'epwNXFMUTlicbQIZFbjoMdflEV176hqhGBKKpWN5'
      console.log('NASA API Key:', NASA_KEY)
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      // Clear the cache before fetching new data
      localStorage.clear()

      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText)
        }
        const apiData = await res.json()
        setData(apiData)
        console.log('Fetched from API')
      } catch (err) {
        console.log('Fetch error: ', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      ) : (
        <>
          {data && (<Main data={data} />)}
          {showModal && (
            <SideBar data={data} handleToggleModal={handleToggleModal} />
          )}
          {data && (
            <Footer data={data} handleToggleModal={handleToggleModal} />
          )}
        </>
      )}
    </>
  )
}

export default App
