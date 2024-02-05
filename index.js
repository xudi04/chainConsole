const express = require("express");
app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");


const proxyOptions = {
    target: 'https://chaindnm1.onrender.com',
    changeOrigin: true,
  };


  app.use('/blocks', createProxyMiddleware(proxyOptions));
  app.use('/add', createProxyMiddleware({ ...proxyOptions, pathRewrite: { '^/add': '/add' }, method: 'POST' }));


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {pep: process.env.PORT});
});

app.listen(process.env.PORT,4000, (req,res) =>{
    console.log("http://localhost:4000");
});