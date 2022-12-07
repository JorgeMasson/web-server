console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherApiForm = document.querySelector(".form-coordinates");
const queryLatitude = document.querySelector(".input-latitude");
const queryLongitude = document.querySelector(".input-longitude");
const timeData = document.getElementById("time");
const locationData = document.getElementById('loc')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/weather?address=philadelphia").then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
      });
    }
  );
  const location = search.value;
  locationData.innerHTML += location
});

weatherApiForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const lat = queryLatitude.value;
  const lon = queryLongitude.value;
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&daily=weathercode,sunrise,sunset,windspeed_10m_max&timezone=America%2FSao_Paulo`
  )
    .then((response) => response.json())
    .then((json) => {
      for (obj in json) {
        if (typeof json[obj] !== "object") {
          timeData.innerHTML += `<p><strong>${obj}:</strong> ${json[obj]},</p>`;
        } else {
          timeData.innerHTML += `<strong><p>${obj}:</strong> <br/> {</p>`;
          if (typeof json[obj] !== "object") {
            timeData.innerHTML += `<ul><li>${json[obj]},</li></ul>`;
          } else {
            for (item in json[obj]) {
              if (typeof json[obj][item] !== "object") {
                timeData.innerHTML += `<ul><li><strong>${item}:</strong> ${json[obj][item]},</li></ul>`;
              } else {
                timeData.innerHTML += `<ul><li><strong>${item}:</strong><br/> {</li></ul>`;
                for (data in json[obj][item]) {
                  timeData.innerHTML += `<ul><ul><li>${json[obj][item][data]},</li></ul></ul>`;
                  if (data == 4) {
                    break;
                  }
                }
                timeData.innerHTML += `<ul><li><p>},</p></li></ul>`;
              }
            }
          }
          timeData.innerHTML += `<p>},</p>`;
        }
      }
    });
});

/* var latitude = "";
var longitude = "";
var timeData = document.getElementById("time");

const handleClick = () => {
    latitude = document.getElementById("input-latitude").value;
    longitude = document.getElementById("input-longitude").value;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=weathercode,sunrise,sunset,windspeed_10m_max&timezone=America%2FSao_Paulo`
    )
      .then((response) => response.json())
      .then((json) => {
        for (obj in json) {
          if (typeof json[obj] !== "object") {
            timeData.innerHTML += `<p><strong>${obj}:</strong> ${json[obj]},</p>`;
          } else {
            timeData.innerHTML += `<strong><p>${obj}:</strong> <br/> {</p>`;
            if (typeof json[obj] !== "object") {
              timeData.innerHTML += `<ul><li>${json[obj]},</li></ul>`;
            } else {
              for (item in json[obj]) {
                if (typeof json[obj][item] !== "object") {
                  timeData.innerHTML += `<ul><li><strong>${item}:</strong> ${json[obj][item]},</li></ul>`;
                } else {
                  timeData.innerHTML += `<ul><li><strong>${item}:</strong><br/> {</li></ul>`;
                  for (data in json[obj][item]) {
                    timeData.innerHTML += `<ul><ul><li>${json[obj][item][data]},</li></ul></ul>`;
                    if (data == 9) {
                      break;
                    }
                  }
                  timeData.innerHTML += `<ul><li><p>},</p></li></ul>`;
                }
              }
            }
            timeData.innerHTML += `<p>},</p>`;
          }
        }
      });
  }; */
