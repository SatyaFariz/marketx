SET AUTOCOMMIT = 0;
START TRANSACTION;
DROP PROCEDURE IF EXISTS get_provinces;
DELIMITER $$
CREATE PROCEDURE get_provinces()

BEGIN

SELECT administrative_area_id, name FROM administrative_area WHERE level = 1;

END $$
DELIMITER ;
COMMIT;