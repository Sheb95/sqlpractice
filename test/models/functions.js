import naturalHairstyles from "../hairstyles-data.js";
import query from "../db/index.js";

export async function getNaturalHairstyles() {
  const data = await query("SELECT * FROM naturalHairstyles");
  console.log(data.rows);
  return data.rows;
}

// export function getNaturalHairstyles() {
//    return naturalHairstyles;
// }

export function deleteHairstyleById(requestedId) {
  let hairstyles = naturalHairstyles;
  const index = hairstyles.findIndex(function ({ id }) {
    return id === requestedId;
  });

  if (typeof index === "number" && index != -1) {
    const deletedHairstyle = hairstyles.splice(index, 1);
    return deletedHairstyle;
  } else {
    return console.log("Hairstyle does not exist");
  }
}

export function createNewHairstyle(newHairstyle) {
  naturalHairstyles.push(newHairstyle);
  return naturalHairstyles[naturalHairstyles.length - 1];
}

export function updateHairstyleById(requestedId, updates) {
  let hairstyles = naturalHairstyles;
  // console.log("Working", hairstyles);

  const index = hairstyles.findIndex(function ({ id }) {
    return id === requestedId;
  });

  if (typeof index === "number" && index != -1) {
    let updatedHairstyle = hairstyles[index];

    //match each hairstyle object key with the key with the updated value
    Object.keys(updatedHairstyle).map((key) => {
      if (Object.keys(updates).includes(key)) {
        updatedHairstyle[key] = updates[key];
      }
    });

    //put that updated hairstyle in the array

    hairstyles = [
      ...hairstyles.slice(0, index),
      updatedHairstyle,
      ...hairstyles.slice(index + 1),
    ];
    return hairstyles[index];
  } else {
    return console.log("Hairstyle not in database");
  }
}
