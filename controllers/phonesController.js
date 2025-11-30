import { db } from "../db.js";

// Fetch all phones
export const getPhones = (req, res) => {
  const q = "SELECT * FROM phones";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
};

// Fetch phone by ID
export const getPhoneById = (req, res) => {
  const q = "SELECT * FROM phones WHERE id = ?";
  const id = req.params.id;

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data[0]);
  });
};

// Search phone by name
export const searchPhones = (req, res) => {
  const search = req.query.q || "";
  const q = `SELECT * FROM phones WHERE brand LIKE ?`;

  db.query(q, [`%${search}%`], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
};


// Fetch the highest-rated phone
// export const getHighestRatedPhone = (req, res) => {
//   const q = `
//     SELECT device
//     FROM phones
//     WHERE rating = (SELECT MAX(rating) FROM phones)
//   `;

//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);

//     return res.json(data[0]); // returns { device: "Samsung Galaxy S25 plus 5g" }
//   });
// };
