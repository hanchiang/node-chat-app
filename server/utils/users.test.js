const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node course'
      }, {
        id: '2',
        name: 'Jen',
        room: 'React course'
      },
      {
        id: '3',
        name: 'Han',
        room: 'Node course'
      }
  ]
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: 1,
      name: 'han',
      room: 'The office fans'
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('Node course');
    expect(userList).toEqual(['Mike', 'Han']);
  });

  it('should return names for react course', () => {
    const userList = users.getUserList('React course');
    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    const expectedUser = users.users[1];
    const resUser = users.removeUser('2');
    expect(resUser).toEqual(expectedUser);
  });

  it('should not remove user', () => {
    const usersBeforeRemove = users.users;
    const resUser = users.removeUser('123213');
    const usersAfterRemove = users.users;
    expect(resUser).toBeFalsy();
    expect(usersBeforeRemove).toEqual(usersAfterRemove);
  });

  it('should find user', () => {
    const resUser = users.getUser('1');
    expect(resUser).toEqual(users.users[0]);
  });

  it('should not find use', () => {
    const resUser = users.getUser('12312');
    expect(resUser).toBeFalsy();
  });
});