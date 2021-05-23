create database PTech4;
use PTech4;

Create table Pesquisa(
	id	INT NOT NULL auto_increment PRIMARY KEY,
    cidade VARCHAR (100) NOT NULL,
    dt_pesquisa datetime

);

DELIMITER $
DROP PROCEDURE IF EXISTS create_search;
CREATE PROCEDURE create_search(IN Pcidade varchar(100))

        BEGIN
            INSERT INTO Pesquisa(cidade, dt_pesquisa) VALUES (Pcidade, NOW());
        END
$

DELIMITER $
DROP PROCEDURE IF EXISTS top_searched;
CREATE PROCEDURE top_searched()

        BEGIN
            SELECT cidade, count(cidade) AS quantidade FROM Pesquisa GROUP BY cidade ORDER BY quantidade DESC limit 5;
        END
$

DELIMITER $
DROP PROCEDURE IF EXISTS last_searched;
CREATE PROCEDURE last_searched()

        BEGIN
            SELECT * FROM Pesquisa ORDER BY dt_pesquisa DESC LIMIT 6;
        END
$
