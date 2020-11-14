module.exports = (configValue = {}) => {
  return async (ctx, next) => {
    ctx.config = configValue || {};
    await next();
  };
};
