/* 
  @name createCharacter
*/
INSERT INTO characters(
  address,
  nft_id,
  level,
  type)
VALUES (
  :address!,
  :nft_id!,
  1,
  :type!
);
