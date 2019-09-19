const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'vagrant',
    password: '123',
    host: 'localhost',
    database: 'lightbnb'
})
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * 
  FROM users
  WHERE email = $1;
  `, [email])
    .then((response) => {
      return response.rows[0];
  })
  
  .catch(err => console.error('query error', err.stack));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * 
  FROM users
  WHERE users.id = $1;
  `, [id])
  .then((response) => {
    return response.rows[0];
  })
  .catch(err => console.error('query error', err.stack));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [user.name, user.email, user.password])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, avg(property_reviews.rating) as avg_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = $1
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT $2;
  `, [guest_id, limit])
  .then ((response) => {
    return response.rows;
  })
  .catch(err => console.error('query error', err.stack));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  const owner_id = Number(options.owner_id);
  const min_price = options.minimum_price_per_night * 100;
  const max_price = options.maximum_price_per_night * 100;
  const min_rating = options.minimum_rating;
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city ILIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(owner_id);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night || options.maximum_price_per_night) {

    if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(min_price);
      queryParams.push(max_price);
      queryString += `WHERE cost_per_night BETWEEN $${queryParams.length - 1}
       AND $${queryParams.length}`;
    } else {
      if (options.minimum_price_per_night) {
        queryParams.push(min_price);
        queryString += `WHERE cost_per_night >= $${queryParams.length}`;
      }

      if (options.maximum_price_per_night) {
        queryParams.push(max_price);
        queryString += `WHERE cost_per_night <= $${queryParams.length}`;
      }
    }    
  }

  if (min_rating) {
    queryParams.push(min_rating);
    queryString += `WHERE rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night`

  if (max_price) {
    queryString += ` DESC`
  }

  queryString += `
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then ((response) => {
    return response.rows;
  })
.catch(err => console.error('query error', err.stack)); 
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
