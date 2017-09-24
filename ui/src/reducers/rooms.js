import R from 'ramda';

const initialRoomsState = {
  // TODO set owner to be something real
  // TODO add online users counter
  global: { ownerId: 'iliyanID', name: '@global' },
  notGlobal1: { ownerId: 'otnovoAZ', name: 'GUZa' },
  notGlobal2: { ownerId: 'otnovoAZ', name: 'GUZb' },
  notGlobal3: { ownerId: 'otnovoAZ', name: 'GUZc' },
  notGlobal4: { ownerId: 'otnovoAZ', name: 'GUZea' },
  notGlobal5: { ownerId: 'otnovoAZ', name: 'GUZasde' },
  notGlobal6: { ownerId: 'otnovoAZ', name: 'GUZasd12' },
  asdnotGlobal6d: { ownerId: 'otnovoAZ', name: 'GasdUZasd12' },
  noasdastGlobal6: { ownerId: 'otnovoAZ', name: 'GUasdZasd12' },
  notGlobasdasal6a: { ownerId: 'otnovoAZ', name: 'GUZasasdasdd12' },
  notGlobasdasasdasdal6b: { ownerId: 'otnovoAZ', name: 'GUZasasdasdasdasdd12' },
  notGlobasdasasdasdasl6v: { ownerId: 'otnovoAZ', name: 'GUZasasdasdd12asdasd2' },
  notGlobasdasal6asda: { ownerId: 'otnovoAZ', name: 'GUZasasdasdd12asdasaa3' },
  notGlobasdasalasdas6d: { ownerId: 'otnovoAZ', name: 'GUZasasdasdd12asdas4' },
}

const rooms = (state = initialRoomsState , { type, room, roomId }) => {
  switch (type) {
    case 'ADD_ROOM':
      return Object.assign({}, state, room);
      case 'REMOVE_ROOM':
      return R.omit([roomId], state);
    default:
      return state;
  }
}

export default rooms;