const zod = require("zod");
const userType = zod.object({
    username: zod.string().min(6),
    firstname: zod.string().min(6),
    lastname: zod.optional(zod.string().min(6)),
    password: zod.string().min(6),  
});

const signInBody = zod.object({
    username: zod.string().min(6),
    password: zod.string().min(6),  
});

const updateUserBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

module.exports = {
    userType,
    signInBody,
    updateUserBody
}