module.exports = {
    type: "object",
    properties: {
        nome: {type: "string"},
        preco: {type: "number"}
    },
    required: ["nome", "preco"],
    additionalProperties: false
}