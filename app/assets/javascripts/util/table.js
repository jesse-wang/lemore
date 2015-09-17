var I = require('immutable');

var updateHash = function(table, data){
  var result = {
    ids: [],
    table: table
  }
  
  data.map(function(row){
    result.ids.push(row.id);
    // matching
    if (!!table.get(row.id)) {
      table = table.set(row.id, row.data);
    } else {
      var newRow = {};
      newRow[row.id] = row.data;  
      table = table.concat(newRow);
    }
  });

  result.table = table;

  return result;
};

var updateUser = function(table, data){
  console.log(data)

  var result = {
    ids: [],
    table: table
  }
  
  data.map(function(row){
    result.ids.push(row.username);
    // matching but prevent mini format to override
    if (table.get(row.username)) {
      table = table.set(row.username, row);
    } else if (!table.get(row.username)) {
      var newRow = {};
      newRow[row.username] = row;  
      table = table.concat(newRow);
    }
  });

  result.table = table;

  return result;
};

var updateCollection = function(table, data){
  var result = {
    ids: [],
    table: table
  }
  
  data.map(function(row){
    result.ids.push(row.collectionname);
    // matching
    if (!!table.get(row.collectionname)) {
      table = table.set(row.collectionname, row);
    } else {
      var newRow = {};
      newRow[row.collectionname] = row;  
      table = table.concat(newRow);
    }
  });

  result.table = table;

  return result;
};

var updateProject = function(project_table, projects, user_table){
  var result = {
    ids: [],
    project_table: project_table,
    user_table: user_table
  }

  projects.map(function(row){
    result.ids.push(row.projectname);

    // update user
    if(row.user_info){
      results = updateUser(user_table, [row.user_info]);
      user_table = results.table;
      row.user = results.ids;
    }

    // matching
    if (project_table.get(row.projectname)) {
      project_table = project_table.set(row.projectname, row);
    } else if (!project_table.get(row.projectname)) {
      var newRow = {};
      newRow[row.projectname] = row;  
      project_table = project_table.concat(newRow);
    }
  });

  result.project_table = project_table;
  result.user_table = user_table;
  
  return result;
};

var updateIds = function(table, hash){
  // matching
  if (!!table.get(hash.id)) {
    table = table.set(hash.id, hash.ids);
  } else {
    var newRow = {};
    newRow[hash.id] = hash.ids;  
    table = table.concat(newRow);
  }

  return table;
};

var keyIn = function(keys) {
  var keySet = I.Set(keys); 
  return function (v, k) {
    return keySet.has(k);
  }
};

module.exports = {
  updateHash: updateHash,
  updateUser: updateUser,
  updateCollection: updateCollection,
  updateProject: updateProject,
  updateIds: updateIds,
  keyIn: keyIn
}
