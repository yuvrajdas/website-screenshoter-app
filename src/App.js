import { useEffect, useState } from "react";
import Error from "./Error";
import Loading from "./Loading";

function App() {
  const api_key = "a8f20d71abe0474bad274190d87673d8";
  const [searchUrl, setSearchUrl] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${api_key}&url=${searchUrl}&fresh=true&full_page=true`;

  const getScreenShot = async () => {
    setSearchUrl("");
    setError(false);
    setLoading(true);
    const resonse = await fetch(apiUrl);
    if (resonse.ok) {
      setImage(resonse);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  const takeScreenShot = (e) => {
    e.preventDefault();
    getScreenShot();
  };
  useEffect(() => {
    setSearchUrl("");
    getScreenShot();
  }, []);
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <h4 className="text-white">
            <i class="fa fa-camera text-warning" aria-hidden="true"></i>{" "}
            ScreenShot App
          </h4>
        </div>
      </nav>
      <section className="container-fluid">
        <div className="container mt-3">
          <form onSubmit={takeScreenShot}>
            <div className="row">
              <div className="col-md-5">
                <input
                  type="text"
                  value={searchUrl}
                  onChange={(e) => setSearchUrl(e.target.value)}
                  className="form-control shadow-none ms-3"
                  placeholder="Paste website url here...."
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-success">Take Screenshot</button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="container-fluid mt-3">
        {!loading && !error ? (
          <div className="conatiner ">
            {image && (
              <a href={image.url} target="_blanck">
                <img
                  src={image.url}
                  alt="Screenshot"
                  style={{ width: "100%" }}
                />
              </a>
            )}
          </div>
        ) : !error && loading ? (
          <Loading />
        ) : !loading && error ? (
          <Error />
        ) : (
          <h5 className="text-center mt-5">
            Paste the website link in above field to take Screenshot
          </h5>
        )}
      </section>
    </>
  );
}

export default App;
