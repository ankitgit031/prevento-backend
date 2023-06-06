// const allRoles = {
//     user: ['getUsers'],
//     admin: ['getUsers', 'manageUsers'],
//   };
const allRoles = {
  INFINITY: ['getUsers', 'addUser', 'addRole', 'getRole'],
  ORIGIN: ['getUsers', 'manageUsers', 'addCustomer', 'addSite', 'addSiteAccess', 'addCustomerLicense', 'addUser', 'addRole', 'getRole'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
