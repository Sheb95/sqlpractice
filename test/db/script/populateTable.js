import query from "../index.js";
import naturalHairstyles from "../../hairstyles-data.js";

async function populateTable() {
   for (let i = 0; i < naturalHairstyles.length; i++) {
      const { hairstyle, image, difficulty, url } = naturalHairstyles[i];

      const res = await query(
         "INSERT INTO naturalHairstyles (hairstyle, image, difficulty, url) VALUES ($1,$2,$3,$4) RETURNING *",
         [hairstyle, image, difficulty, url]
      );
      console.log(`Success`, res);
   }
}

populateTable();
