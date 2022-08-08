import React, { useState, useEffect } from "react";

let data1 = new Date();



export const FechaHora = () => {
  var [date, setDate] = useState(new Date());

let day = date.getDay();
  let year = date.getFullYear();
let month = date.toLocaleString("default", { month: "long" });
let weekday = date.toLocaleString("default", { weekday: "long" });

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
  });

  return (
    <div>
      {/* <p> {date.toLocaleDateString()} </p> */}
        <p>  {weekday} {day} {month} {year}</p>
      <p className="hora">{date.toLocaleTimeString()}</p>
    </div>
  );
};

export default FechaHora;