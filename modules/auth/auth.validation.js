import joi from "joi";



export const signup = 
      joi.object().required().keys({

    userName: joi.string().required().min(2).max(20).messages({

        "any.required": "userName is required"
    }),
    email: joi.string().required().email(),

    password: joi.string().required(),
    gender:joi.string().required(),
    image:joi.string().required()
})
 

export const login = {


    body: joi.object().required().keys({

        email: joi.string().required().email(),

        password: joi.string().required()

    })

}