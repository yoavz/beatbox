ownsRoom = function(room, user) {
  if (!user)
    return false;

  return room.owner === user._id;
}
