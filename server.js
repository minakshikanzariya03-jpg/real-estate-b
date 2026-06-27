const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const departmentRoutes = require('./route/department');

app.use('/api', departmentRoutes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running");
});

// app.listen(3000, () => {
//     console.log('Server Running');
// });