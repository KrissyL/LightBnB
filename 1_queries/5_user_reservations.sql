SELECT reservations.*, properties.*, avg(property_reviews.rating) as avg_rating
FROM reservations
JOIN properties ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE end_date < now()
AND reservations.guest_id = 1
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date;