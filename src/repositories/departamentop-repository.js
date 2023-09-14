const mongoose = require('mongoose')
const Departamento = mongoose.model('DepartamentoP')

exports.get = async () => {
    const result = await departamento.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    let departamento = new Departamento(data); 
    await departamento.save();
}


exports.delete = async (id) => {
    await departamento.findByIdAndDelete(
        id, {
            $set: {
                ativo: false
            }
        })
}

exports.getById = async (id) => {
    const result = await departamento.findOne({
            _codigo: codigo
        },
        "_codigo salario data codigo_pessoa departamento"
    );

    return result;


}

exports.update = async (id, data) => {
    await departamento.findByIdAndUpdate(id, {
        $set: {
            codigo: data._codigo,
            salario: data.salario,
            data: data.data,
            codigo_pessoa: data.codigo_pessoa,
            departamento: data.departamento

        }
    })
}