const app = require('./app');
const port = require('./config').port;

app.use( async (err, req, res, next) => {
  if(err) {
    return res.status(404).json({ message: `[Route] -> ${req.url} <- not found.`, err });
  }
  
  next();
});

app.use( async (err, req, res, next) => {
  if(err) {
    return res.status(500).json({ message: `[Route] -> ${req.url} <- caused a crash.`, err });
  }
  
  next();
});

app.listen(port, () => console.log(`🔥 -------- listening on PORT: ${port} ---------- 🔥`));
