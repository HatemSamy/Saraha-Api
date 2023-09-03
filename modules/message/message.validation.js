import joi from "joi";

export const SendMessage = {
    body: joi.object().required().keys({

        text: joi.string().required().messages({

            "any.required": "Message is required"
        })
    }),
    params: joi.object().required().keys({

        recieverId: joi.string().required()
    })
}

export const DeleteMessage = {
    
    params: joi.object().required().keys({

        id: joi.string().required().min(24)
    })
}