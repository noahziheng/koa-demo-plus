module.exports = () => {
  return async (ctx, next) => {
    if (!/^\/api/.test(ctx.req.url)) {
      // 仅针对 API 封装 JSON 返回结构
      return await next();
    }
    try {
      await next();
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: ctx.body
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        data: ctx.body,
        errMsg: error.message
      };
    }
  };
};
