SET @USR_CNT = (SELECT COUNT(user_id) FROM user);

DROP PROCEDURE IF EXISTS get_rnd_usr;
DELIMITER $
CREATE PROCEDURE get_rnd_usr(page_from INT, page_size INT)
BEGIN
  SET @_page_from = page_from;
  SET @_page_size = page_size;
  PREPARE stmt FROM "select u.user_id, u.user_name, u.office_id, u.user_icon_id from user u limit ?, ?;";
  EXECUTE stmt USING @_page_from, @_page_size;
  DEALLOCATE PREPARE stmt;
END$

DELIMITER ;

DROP table IF EXISTS usr_cnt;
CREATE TABLE IF NOT EXISTS usr_cnt (cnt int NOT NULL);

insert into usr_cnt (cnt) values(@USR_CNT); 

CREATE INDEX dprt_id ON department_role_member (user_id, belong);

CREATE INDEX uid_lookup ON user (mail, password);

CREATE INDEX get_users ON user (entry_date, kana);

CREATE INDEX idx_match_uid ON match_group_member(user_id);
