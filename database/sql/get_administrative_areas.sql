SET AUTOCOMMIT = 0;
START TRANSACTION;
DROP PROCEDURE IF EXISTS get_administrative_areas;
DELIMITER $$
CREATE PROCEDURE get_administrative_areas(parent_id INT)

BEGIN

IF (parent_id IS NULL) THEN
  SELECT administrative_area_id, name FROM administrative_area WHERE level = 1;
ELSE
  SELECT children.administrative_area_id, children.name FROM administrative_area children
  JOIN administrative_area parent 
  ON JSON_CONTAINS(children.parents, CONCAT_WS('', '"', parent.code, '"'))
  WHERE parent.administrative_area_id = parent_id AND children.level = (parent.level + 1);
END IF;

END $$
DELIMITER ;
COMMIT;