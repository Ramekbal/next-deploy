const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_userName: "ramekbal159",
        mongodb_password: "test1234",
        mongodb_cluster: "cluster0",
        mongodb_database: "newsletter",
      },
    };
  }
  return {
    env: {
      mongodb_userName: "ramekbal159",
      mongodb_password: "test1234",
      mongodb_cluster: "cluster0",
      mongodb_database: "newsletter",
    },
  };
};
