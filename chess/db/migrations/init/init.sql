-- //TODO: remove possibly ?
CREATE TABLE block_heights ( 
  block_height INTEGER PRIMARY KEY,
  seed TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false
);

-- //TODO: remove start
CREATE TABLE scheduled_data (
  id SERIAL PRIMARY KEY,
  block_height INTEGER NOT NULL,
  input_data TEXT NOT NULL
);

CREATE TABLE nonces (
  nonce TEXT PRIMARY KEY,
  block_height INTEGER NOT NULL
);
-- //TODO: remove end

CREATE TYPE lobby_status AS ENUM ('open', 'active', 'finished', 'closed');
CREATE TABLE lobbies (
  lobby_id TEXT PRIMARY KEY,
  num_of_rounds INTEGER NOT NULL,
  round_length INTEGER NOT NULL,
  play_time_per_player INTEGER NOT NULL,
  current_round INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL,
  creation_block_height INTEGER NOT NULL,
  hidden BOOLEAN NOT NULL DEFAULT false,
  practice BOOLEAN NOT NULL DEFAULT false,
  lobby_creator TEXT NOT NULL,
  player_one_iswhite BOOLEAN NOT NULL,
  player_two TEXT,
  lobby_state lobby_status NOT NULL,
  latest_match_state TEXT NOT NULL
);

CREATE TABLE rounds(
  id SERIAL PRIMARY KEY,
  lobby_id TEXT NOT NULL references lobbies(lobby_id),
  round_within_match INTEGER NOT NULL,
  match_state TEXT NOT NULL,
  starting_block_height INTEGER NOT NULL references block_heights(block_height),
  execution_block_Height INTEGER references block_heights(block_height)
);

CREATE TYPE match_result AS ENUM ('win', 'tie', 'loss');
CREATE TABLE final_match_state (
   lobby_id TEXT NOT NULL references lobbies(lobby_id),
   player_one_iswhite BOOLEAN NOT NULL,
   player_one_wallet TEXT NOT NULL,
   player_one_result match_result NOT NULL,
   player_one_elapsed_time INTEGER NOT NULL,
   player_two_wallet TEXT NOT NULL,
   player_two_result match_result NOT NULL,
   player_two_elapsed_time INTEGER NOT NULL,
   positions TEXT NOT NULL,
   UNIQUE (lobby_id)
);
CREATE TABLE match_moves (
   id SERIAL PRIMARY KEY,
   lobby_id TEXT NOT NULL references lobbies(lobby_id),
   wallet TEXT NOT NULL,
   round INTEGER NOT NULL,
   move_pgn TEXT NOT NULL
);

CREATE TABLE global_user_state (
  wallet TEXT NOT NULL PRIMARY KEY,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  ties INTEGER NOT NULL DEFAULT 0
);


CREATE FUNCTION update_lobby_round() RETURNS TRIGGER AS $$
BEGIN
  UPDATE lobbies 
  SET 
  current_round = NEW.round_within_match
  WHERE lobbies.lobby_id = NEW.lobby_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_current_round
AFTER INSERT ON rounds
FOR EACH ROW 
EXECUTE FUNCTION update_lobby_round();