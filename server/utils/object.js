exports.addObjectName = function(object, name) {
  const emitObject = {};
  emitObject[name] = object;
  return emitObject;
};
