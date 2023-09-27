'use strict';

/**
 * event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
    me: async (ctx, next) => {
        ctx.body = "ok-core";
    }
}));
