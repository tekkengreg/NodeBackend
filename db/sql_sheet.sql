
------ PRIMITIVE SHAPE
DROP TABLE primitive_shape;
CREATE TABLE IF NOT EXISTS  primitive_shape (
	id  INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL, 
    display_name TEXT
);


SELECT * FROM primitive_shape;

INSERT INTO primitive_shape
		(name, display_name)
	VALUES 
		('square', 'Square'),
		('circle', 'Circle'),
        ('triangle', 'Triangle');
        
------ PRIMITIVE COLOR
DROP TABLE primitive_color;
CREATE TABLE IF NOT EXISTS  primitive_color (
	id  INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(7) NOT NULL,
    display_name VARCHAR(20) NOT NULL
);
INSERT INTO primitive_color
		(display_name, code)
	VALUES 
		('Red', '#FF0000'),
		('Green', '#00FF00'),
        ('Blue', '#0000FF');
        
SELECT * FROM primitive_color;


------ DRAWING
DROP TABLE drawing;
CREATE TABLE IF NOT EXISTS  drawing (
	id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    owner VARCHAR(20) NOT NULL
);
INSERT INTO drawing
		(name, owner)
	VALUES 
		('my_artwork.png', 'Picasso'),
		('my_artwork_copy.png', 'Piccaso');
        
SELECT * FROM drawing;

------ FORM
DROP TABLE form;
CREATE TABLE IF NOT EXISTS  form (
	id  INTEGER PRIMARY KEY AUTOINCREMENT,
    drawing_id INTEGER NOT NULL,
    primitive_shape_id INTEGER NOT NULL,
    primitive_color_id INTEGER NOT NULL,
    size DOUBLE,
    x DOUBLE,
    y DOUBLE,
    orientation DOUBLE,
	FOREIGN KEY (drawing_id)
		REFERENCES drawing(id),
	FOREIGN KEY (primitive_shape_id)
		REFERENCES primitive_shape(id),
    FOREIGN KEY (primitive_color_id)
		REFERENCES primitive_color(id)
);
INSERT INTO form
		(drawing_id, primitive_shape_id,primitive_color_id, size, x, y, orientation )
	VALUES 
		( 1, 1, 3, 1  , 10, 14, 0),
		( 1, 2, 2, 2  , 50, 34, 0),
		( 1, 3, 1, 1.5, 60, 24, 10);
        
SELECT * FROM form;

------ MY BIG SELECT
SELECT d.name, ps.display_name, pc.display_name, pc.code, f.size, f.x, f.y, f.orientation FROM drawing as d
	INNER JOIN form as f ON d.id = f.drawing_id
    INNER JOIN primitive_shape AS ps ON ps.id =	 f.primitive_shape_id
    INNER JOIN primitive_color AS pc ON pc.id = f.primitive_color_id;
    