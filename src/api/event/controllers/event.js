"use strict";
const { sanitize, validate } = require("@strapi/utils");

/**
 * event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  me: async (ctx, next) => {
    const contentType = strapi.contentType("api::event.event");
    const user = ctx.state.user;

    console.log(user);

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const data = await strapi.entityService.findMany(contentType.uid, {
      populate: "*",
      filters: {
        user: user.id,
      },
    });

    if (!data) {
      return ctx.notFound();
    }

    return await sanitize.contentAPI.output(data, contentType, {
      auth: ctx.state.auth,
    });
  },
}));
