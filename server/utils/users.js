class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let removedUser;
    this.users = this.users.filter(user => {
      const foundUser = user.id === id;
      if (foundUser) {
        removedUser = user;
      }
      return !foundUser;
    });
    return removedUser;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  getUserList(room) {
    const users = this.users.filter(user => user.room === room);
    return users.map(user => user.name);
  }
}

module.exports = {
  Users
};


// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getUserDescription() {
//     return `${this.name} is ${this.age} years old`;
//   }
// }

// let me = new Person('Han', 24);
// console.log(me.name);
// console.log(me.age);
// console.log(me.getUserDescription());