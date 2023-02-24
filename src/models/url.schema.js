import joi from "joi";

const postShortenUrl = joi.object({
  url: joi.string().uri().required(),
});

export default postShortenUrl;
