const express   =  require("express");
const cors      = require("cors");
const mongoose  = require("mongoose");
const path      = require("path");
const app       =  express();
const routes    = require("./routes");

const PORT = process.env.PORT || 8000;

//Ha szervert dev környzetben indítjuk el, akkor használja a .env fájlt
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
//---

app.use(cors());
app.use(express.json());


//https://developer.mozilla.org/hu/docs/Web/JavaScript/Reference/Statements/try...catch
//try: Azok az utasítások, amelyek kivételt válthatnak ki.
//catch: Azok az utasítások, amelyek akkor hajtódnak végre, ha valami kivételt vált ki a try blokkban.
try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        //Konfiguráció miatt kell
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    console.log("MongoDB connected!");
}catch(error){
    console.log(error);
}
app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});

