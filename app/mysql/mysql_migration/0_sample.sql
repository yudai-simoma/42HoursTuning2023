CREATE INDEX idx_match_group_all ON match_group(match_group_id, match_group_name, description, status, created_by, created_at);
CREATE INDEX idx_match_group_member_group_id ON match_group_member(match_group_id);
CREATE INDEX idx_mail ON user(mail);
CREATE INDEX idx_file_id ON file(file_id);
CREATE INDEX idx_session_linked_user_id ON session(linked_user_id);
