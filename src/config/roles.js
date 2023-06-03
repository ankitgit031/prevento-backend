// const allRoles = {
//     user: ['getUsers'],
//     admin: ['getUsers', 'manageUsers'],
//   };
const allRoles = {
  INFINITY: ['getUsers', 'addUser', 'addRole'],
  ORIGIN: ['getUsers', 'manageUsers', 'addCustomer', 'addSite', 'addSiteAccess', 'addCustomerLicense', 'addUser', 'addRole'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
