module.exports.formatUserObj = function(userObj) {
  var formatObj = Object.assign(userObj);
  formatObj.site_admin = Number(formatObj.site_admin);
  formatObj.hireable = Number(formatObj.hireable);
  formatObj.created_at = new Date(formatObj.created_at).toISOString().slice(0, 19).replace('T', ' ');
  formatObj.updated_at = new Date(formatObj.updated_at).toISOString().slice(0, 19).replace('T', ' ');
  return formatObj;
}
