const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departamentoPessoalSchema = new Schema({
    codigo_pessoa: {
        type: String,
        required: [true, "Código da pessoa é obrigatório"]
    },
    salario: {
        type: Number,
        required: [true, "Salário é obrigatório"]
    },
    data: {
        type: Date,
        required: [true, "Data é obrigatória"]
    },
    codigo: {
        type: String,
        required: [true, "Código é obrigatório"]
    },
    departamento: {
        type: String,
        required: [true, "Departamento é obrigatório"]
    }
});

module.exports = mongoose.model('DepartamentoP', departamentoPessoalSchema);
