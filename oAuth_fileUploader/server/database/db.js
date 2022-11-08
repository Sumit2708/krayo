const mongoose = require("mongoose");

const DB =
  "mongodb+srv://admin:psWfpZ5UsZ4g3BlB@imgapp.ltdqsbm.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log(`database connected`);
  })
  .catch((err) => {
    console.log(`DB error ${err}`);
  });

//psWfpZ5UsZ4g3BlB
