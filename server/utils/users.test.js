const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: "1",
      name: "Mike",
      room: "The Office Fans"
    },{
      id: "2",
      name: "Sam",
      room: "Scrubs Fans"
    },{
      id: "3",
      name: "Jose",
      room: "The Office Fans"
    }]
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: "sdfsdf",
      name: "WDJ",
      room: "The Office Fans"
    };

    let reUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for the office fans', ()=>{
    let userList = users.getUserList('The Office Fans');

    expect(userList).toEqual(['Mike', 'Jose']);
  });

  it('should return names for Scrubs Fans', ()=>{
    let userList = users.getUserList('Scrubs Fans');

    expect(userList).toEqual(['Sam']);
  });

  it('should find user', () => {
    let userID = '2',
        user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });

  it('should not find user', () => {
    let userID = '150',
        user = users.getUser(userID);

    expect(user).toBeUndefined();
  });

  it('should not remove a user', () => {
    let userID = '108',
        user = users.removeUser(userID);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it('should remove a user', () => {
    let userID = '1',
        user = users.removeUser(userID);

    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });
});
