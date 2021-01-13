const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    date: Date,
    //Megadjuk hogy melyik User kezeli az Eventet
    user: {                                 
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User"
    }
},{
    toJSON: {
        virtuals: true,
    }
});

//A Thumbnail URL a POST req során elmentődik DE nem a mongoba, ezért virtual !. (EventSchemanal engedélyezni kellet a virtual prop-ot)
EventSchema.virtual("thumbnail_url").get(function () {return `http://localhost:8000/files/${this.thumbnail}` } );

module.exports = mongoose.model("Event", EventSchema);