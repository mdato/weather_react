import React, { useEffect, useState } from "react";
import FechaHora from "./FechaHora";

const SearchWeather = () => {
  const [isOpen, setOpen] = useState(
    JSON.parse(localStorage.getItem("is-open")) || false
  );

  const [search, setSearch] = useState(isOpen ? isOpen : "london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  let mounted = true;

  useEffect(() => {
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_KEY}&q=${search}&days=3&aqi=yes&alerts=yes&lang=en`;

    const getWeather = async () => {
      const res = await fetch(URL);

      if (res.status !== 200) {
        const error = await res.json();
        throw { message: error.message, status: error.cod };
      }
      if (mounted) {
        const data = await res.json();
        setData(data);
      }
      return () => {
        mounted = false;
      };
    };
    getWeather();
  }, [search]);

  const handleToggle = () => {
    localStorage.setItem("is-open", JSON.stringify(data.location.name));
    setOpen(data.location.name);
    alert(`${data.location.name} was saved`);
  };

  console.log(typeof data.location);
  if (typeof data.location === "undefined") {
    return <div className="loading">loading ....</div>;
  }

  let temp = data.current.temp_c;
  let temp_min = data.forecast.forecastday[0].day.mintemp_c;
  let temp_max = data.forecast.forecastday[0].day.maxtemp_c;
  let names = data.location.name;
  let country = data.location.country;
  let fotito = "https:" + data.current.condition.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
  };

  return (
    <div>
      <div className="container mt-5 max-vh-100px">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/1200x1850/?${search}`}
                className="card-img"
                alt={search}
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-90 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search city ..."
                      aria-label="Search city"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="cuadro">
                  <div className="bg-dark bg-opacity-75 pt-1 pb-3">
                    <h2 className="card-title">
                      <div className="ciudad">
                        <img src={fotito} className="fotito" alt={search} />
                        {names}
                      </div>

                      <p className="country">
                        <button className="saveCity" onClick={handleToggle}>
                          Save City
                        </button>
                        {country}
                        <br />
                      </p>
                    </h2>

                    <span className="country">
                      <FechaHora />
                    </span>

                    <hr />

                    <div className="temper">
                      <h1 className="fw-bolder mb-0">{temp}</h1>
                      <h3 className="grados">º</h3>
                      <h3 className="centigrado">c</h3>
                    </div>

                    <p className="lead fw-bolder mb-0">
                      {data.current.condition.text}
                    </p>
                    <p className="lead">
                      min: {temp_min} | max: {temp_max}
                    </p>

                    <div className="uno">
                      <div className="dos">
                        <div className="tres">
                          <div className="cuatro">
                            👁 Visibility: {data.current.vis_km} km
                          </div>
                        </div>
                        <div className="tres">
                          <div className="cuatro">
                            🌡 Feels like: {data.current.feelslike_c}ºc
                          </div>
                        </div>
                      </div>

                      <div className="dos">
                        <div className="tres">
                          <div className="cuatro">
                            💧 Humidity: {data.current.humidity} %
                          </div>
                        </div>
                        <div className="tres">
                          <div className="cuatro">
                            🏁 Wind: {data.current.wind_kph} k/h
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
