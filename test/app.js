import express from "express";
import bodyParser from "body-parser";

// import { restart } from "nodemon";
import naturalHairstyles from "./hairstyles-data.js";
import {
   updateHairstyleById,
   getNaturalHairstyles,
   deleteHairstyleById,
   createNewHairstyle,
} from "./models/functions.js";

const app = express();
const port = 3000;
app.use(express.json());

// root path
app.get("/", (req, res) => {
   res.json({ message: "Wazaaaaaaap" });
});
// show all hairstyles
app.get("/hairstyles", (req, res) => {
   const allHairstyles = getNaturalHairstyles();
   res.json({ message: "All hairstyles", payload: allHairstyles });
});

// get hairstyle by id
app.get("/hairstyles/:id", function (req, res) {
   const id = Number(req.params.id);
   // function to find hairstyle
   const findHairstyleByID = (id) => {
      return naturalHairstyles.find(function (hairstyle) {
         return hairstyle.id === id;
      });
   };

   const foundHairstyle = findHairstyleByID(id);

   if (foundHairstyle === undefined) {
      res.json({ message: `Hairstyle id ${req.params.id} not found.` });
      return;
   }

   res.json({ message: "Hairstyle found", payload: foundHairstyle });
});

//update hairstyle by id
app.patch("/hairstyles/:id", function (req, res) {
   const id = Number(req.params.id);
   const returnedUpdatedHairStyles = updateHairstyleById(id, req.body);
   res.json({ success: true, payload: returnedUpdatedHairStyles });
});

//delete hairstyle by id
app.delete("/hairstyles/:id", function (req, res) {
   const id = Number(req.params.id);
   const deletedHairstyle = deleteHairstyleById(id);
   res.json({
      success: true,
      "Deleted hairstyle": deletedHairstyle,
      "Updated list": naturalHairstyles,
   });
   // call function that deletes hairstyle and returns the deleted hairstyle
   //res.json ({success: true, payload: deletedItem})
});

// !!!!! adding empty object
app.post("/hairstyles", function (req, res) {
   const newHairstyle = req.body;
   console.log(newHairstyle);
   const addedHairstyle = createNewHairstyle(newHairstyle);
   res.json({ success: true, payload: addedHairstyle, all: naturalHairstyles });
});

app.listen(port, () => {
   console.log(`App listening at http://localhost:${port}`);
});
