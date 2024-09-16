// developerPermission is in dev name controller api is
// http://localhost:9090/api/v1/dev-name/local
export const role = {
  permission: {
    permissionGetAll: 'permission-get-all',
    permissionsStore: 'permissions-store',
    permissionsUpdate: 'permissions-update',
    permissionSingle: 'permission-single',
    permissionDelete: 'permission-delete',
    permissionStatusChange: 'permission-status-change',
  },
  role: {
    roleAllData: 'role-all-data',
    roleStore: 'role-store',
    roleUpdate: 'role-update',
    roleSingle: 'role-single',
    roleDelete: 'role-delete',
    roleStatusChange: 'role-status-change',
  },
  user: {
    userAllData: 'user-all-data',
    userStore: 'user-store',
    userUpdate: 'user-update',
    userGetSingle: 'user-get-single',
    userDelete: 'user-delete',
    userStatusChange: 'user-status-change',
  },
  permissionName: {
    permissionNameGetAll: 'permission-name-get-all',
    permissionNameStore: 'permission-name-store',
    permissionNameUpdate: 'permission-name-update',
    permissionNameGetSingle: 'permission-name-get-single',
    permissionNameDelete: 'permission-name-delete',
    permissionNameStatusChange: 'permission-name-status-change',
  },
  allBasicSettings: {
    getBasicAllSettings: 'get-basic-all-settings',
  },
}
