# Via Chat Server

Implement chat server between unlimited users.
For every room only the last 100 messages should be kept.
You can use in-memory store or database of choice: CockroachDB, MongoDB

## Task 1: Server End-points

1. `/creatRoom?name="name"`
    - "name" should be less than 64 chars
    - If the room exists, should return an error
1. `/post?room="name"&user="..."&msg="...."`
    - Should return an error if the "room" doesn't exist
    - "msg" size is max 140 chars
    - "user" size is limited to 64 chars
    - Implement a POST http with JSON body
1. `/get?room="name"&limit=50`
    - Limit is always less than 100. Default value of "limit" is 20.
1. You may need more endpoints to implement additional features. Be creative and
extend the functionality, based on the needs of the client app.
1. For the sake of simplicity you can have all the data in memory in the server
    - Bonus: Use backend database like: CockroachDB or MongoDB.
    
## Task 2: Implement simple CLI Client app

Name of executable "chat". Chat should implement REPL interface, with the 
following commands:
1. `connect "address_of_the_server"` - should connect to existing server
1. `user "your_user_name"` - will set your user name for communication
1. `room "room_name"`  - will enter the virtual room
1. `get`              - once in the room, `get` will fetch last 10 messages
    - `get "number"`    - should fetch last "number" msgs from the room
1. `post "some text"` - should post to the room, with your user name

NOTE: Quotes are not necessary in the commands above.

##  Task 3:  Implement real-time CLI Client
Real-time client should have all the commands and features from the simple client
1. `live "room_name"`   // Should implement real-time messaging system using the last 
line of the terminal as an edit box to send messages in the room.


##  Task 4: Web GUI
Implement Web based UI for the Chat server

Using HTML/JS/CSS. Any web framework can be used. React.js is preferable.

##  Task 5: Bonus Tasks

Extend the server and client to support:
1. List all active user 
1. List all rooms
1. Posibility to invite an user to a room

