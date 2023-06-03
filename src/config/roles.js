// const allRoles = {
//     user: ['getUsers'],
//     admin: ['getUsers', 'manageUsers'],
//   };
const allRoles = {
  INFINITY: ['getUsers'],
  ORIGIN: ['getUsers', 'manageUsers', 'addCustomer', 'addSite', 'addSiteAccess', 'addCustomerLicense'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
