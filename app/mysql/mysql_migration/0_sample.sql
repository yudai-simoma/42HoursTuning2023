CREATE INDEX idx_match_group_all ON match_group(match_group_id, match_group_name, description, status, created_by, created_at);
CREATE INDEX idx_match_group_member_group_id ON match_group_member(match_group_id);
