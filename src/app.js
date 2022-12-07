const express = require("express");
const path = require("path");
const hbs = require('hbs')

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jorge",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Jorge",
  });
});

// Create a template for help page
//
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "This is some helpful text",
    name: 'Jorge'
  });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  console.log(req.query.search)
  res.send({
    products: []
  })
})

// Create two more HTML files
//
// 1. Create a html page for about with "About" title
// 2. Create a html page for help with "Help" title
// 3. Remove the old route handlers for both
// 4. Visit both in the browser to test your work

/* app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
}); */

/* app.get("/help", (req, res) => {
  res.send([
    {
      name: "Jorge",
      age: 36,
      occupation: "Software Engineer",
      location: "Hermosillo",
      school: "ITSON",
    },
    {
      name: "Juan",
      age: 25,
      occupation: "Teacher",
      location: "Culiacán",
      school: "ITSON",
    },
  ]);
}); */

// Setup two new routes
//
// 1. Setup an about route and render a page title
// 2. Setup a weather rout and render a page title
// 3. Test your work

/* app.get("/about", (req, res) => {
  res.send(
    '<div style="background: lightgreen; height: 200px; margin: 50px; padding: 30px;"><button style="color: blue; font-weight: 900; font-size: 50px;">About</button></div>'
  );
}); */

// Update routes
//
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON
// 3. Test your work

// Update weather endpoint to accept address
//
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//    - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address term'
    })
  } /* else {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=29.1026&longitude=-110.97732&hourly=temperature_2m&daily=weathercode,sunrise,sunset,windspeed_10m_max&timezone=America%2FSao_Paulo"
    )
      .then((response) => response.json())
      .then((json) => res.send(json));
  } */

  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
    address: req.query.address
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Jorge',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) =>{
  res.render('404', {
    title: '404',
    name: 'Jorge',
    errorMessage: 'Page not found'
  })
})

// Create and render a 404 page with handlebars
//
// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes.
//    - Page no found
//    - Help article not found
// 4. Test your work

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
