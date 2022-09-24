exports.generateCode = (length) => {
  let code = "";
  const schema = "0123456789";
  for (let index = 0; index < length; index++) {
    code += schema.charAt(Math.floor(Math.random() * schema.length));
  }
  return code;
};
