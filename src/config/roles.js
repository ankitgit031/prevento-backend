// const allRoles = {
//     user: ['getUsers'],
//     admin: ['getUsers', 'manageUsers'],
//   };
const allRoles = {
  INFINITY: ['getUsers'],
  ORIGIN: ['getUsers', 'manageUsers', 'addCustomer'],
};
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  module.exports = {
    roles,
    roleRights,
  };
  