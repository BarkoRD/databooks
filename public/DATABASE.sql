-- CREATE TABLE Usuarios(
--     Id_Usuarios INT PRIMARY KEY,
--     Nombre VARCHAR(50),
--     Apellido VARCHAR(50),
--     Correo VARCHAR(50),
--     Telefono VARCHAR(15),
--     Contraseña VARCHAR(20)
-- );

-- Create table Cliente(
--     Id_Cliente INT PRIMARY KEY,
--     Nombre_Cliente VARCHAR(100) NOT NULL,
--     Razon_Social VARCHAR(50) NOT NULL,
--     RNC VARCHAR(9) NOT NULL UNIQUE,
--     Telefono VARCHAR(15),
--     Correo VARCHAR(50),
--     Direccion VARCHAR(100)
-- );

-- Create table Proveedor(
--     Id_Proveedor INT PRIMARY KEY,
--     Nombre_Proveedor VARCHAR(50),
--     RNC VARCHAR(9) UNIQUE,
--     Direccion VARCHAR(100),
--     Telefono VARCHAR(15),
--     Correo VARCHAR(50)
-- );

-- Create table Productos(
--     Id_Productos INT PRIMARY KEY,
--     Nombre_Producto VARCHAR(75),
--     Referencia VARCHAR(50) UNIQUE,
--     Costo FLOAT,
--     Precio FLOAT,
--     Descripcion VARCHAR(50),
--     Categoria VARCHAR(50),
--     Unidad_Medida VARCHAR(50),
--     Nombre_Proveedor VARCHAR(50)
-- );

-- create table Factura(
--     Id_Factura INT PRIMARY KEY,
--     RNC VARCHAR(9),
--     Nombre_Cliente VARCHAR(100),
--     Vendedor VARCHAR(50),
--     Producto VARCHAR(60),
--     Precio FLOAT,
--     Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


CREATE TABLE users(
    id_usuarios INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(15),
    user_pass VARCHAR(20)
);

CREATE TABLE clients(
    client_rnc VARCHAR(9) PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    razon_social VARCHAR(50) NOT NULL,
    client_phone VARCHAR(15),
    client_email VARCHAR(50),
    client_address VARCHAR(100),
    user_id INT NOT NULL REFERENCES usuarios(id_usuario) 
);

CREATE TABLE suppliers(
    supplier_rnc VARCHAR(9) PRIMARY KEY,
    supplier_name VARCHAR(50),
    supplier_address VARCHAR(100),
    supplier_phone VARCHAR(15),
    supplier_email VARCHAR(50),
    user_id INT NOT NULL REFERENCES usuarios(id_usuario) 
);

CREATE TABLE products(
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(75),
    reference VARCHAR(50) UNIQUE,
    product_description VARCHAR(50),
    cost FLOAT,
    price FLOAT,
    supplier_rnc INT NOT NULL REFERENCES proveedor(id_proveedor),
    user_id INT NOT NULL REFERENCES usuarios(id_usuario) 
);