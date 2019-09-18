INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'sebastionguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Sue Luna', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Rosalie Garza', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, province, city, street, post_code)
VALUES (1, 'Speed Lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930.61, 6, 4, 8, 'Canada', 'Quebec', 'Sotboske', '536 Namsub Highway', 28142),
(2, 'Blank Corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 852.34, 6, 6, 7, 'Canada', 'Newfoundland and Labrador', 'Genwezuj', '1650 Hejto Center', '44583'),
(2, 'Habit Mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 460.58, 0, 5, 6, 'Canada', 'Ontario', 'Jaebvap', '513 Powov Grove', 38051),
(3, 'Headed Know', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 826.40, 0, 5, 5, 'Canada', 'Nova Scotia', 'Upetafpuv', '1392 Gaza Junction', 81059),
(3, 'Port Out', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg', 23.58, 2, 8, 0, 'Canada', 'Newfoundland and Labrador', 'Vutgapha', '169 Nuwug Circle', 00159);

INSERT INTO reservations (property_id, guest_id, start_date, end_date)
VALUES (1, 2, '2018-09-11', '2018-09-26'),
(2, 3, '2019-01-04', '2019-02-01'),
(3, 4, '2021-10-01', '2021-10-14'),
(1, 3, '2014-10-21', '2014-10-22'),
(2, 4, '2016-07-17', '2016-08-01');

INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message)
VALUES (2, 2, 3, 4, 'message'),
(1, 4, 1, 4, 'message'),
(3, 1, 2, 3, 'message'),
(4, 3, 4, 2, 'message'),
(5, 2, 4, 1, 'message');

INSERT INTO guest_reviews (guest_id, owner_id, reservation_id, rating, message)
VALUES (1, 1, 3, 2, 'message'),
(2, 3, 2, 3, 'message'),
(3, 2, 1, 4, 'message'),
(5, 4, 3, 2, 'message'),
(4, 5, 4, 1, 'message');