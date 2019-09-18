SELECT properties.city, count(reservations) as reservations
FROM reservations
JOIN properties ON properties.id = property_id
GROUP BY properties.city
ORDER BY reservations DESC;