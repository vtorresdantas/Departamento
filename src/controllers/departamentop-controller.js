const repository = require("../repositories/departamentop-repository")
const ValidationContract = require('../util/validator')

exports.getAll = async (req, res, next) => {
    const data = await repository.get();

    if (data == null)
        res.status(204).send();

    res.status(200).send(data);
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.codigo_pessoa, 4, 'O código da pessoa precisa de no mínimo 4 caracteres.');
    contract.hasMaxLen(req.body.codigo_pessoa, 50, 'O código da pessoa pode ter no máximo 20 caracteres.');
    contract.isRequired(req.body.salario, 'O salário é obrigatório.');
    contract.isRequired(req.body.data, 'A data é obrigatória.');
    contract.isRequired(req.body.codigo, 'O código é obrigatório.');
    contract.isRequired(req.body.departamento, 'O departamento é obrigatório.');

    // URL da API que você deseja buscar
const apiPessoas = 'http://localhost:3000/pessoas/'+req.body.codigo_pessoa;
// Realiza uma solicitação GET para a API usando o fetch
fetch(apiPessoas)
  .then(response => {
    console.log('Aqui')
    // Verifica se a resposta da solicitação foi bem-sucedida
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados da API');
    }
    // Converte a resposta para JSON
    return response.json();
  })
  .then(data => {
    // Manipula os dados da resposta JSON
    console.log('Dados da API:', data);
    res.status(200).send(data)
  })
  .catch(error => {
    // Captura e lida com erros
    console.error('Erro:', error);
  });

  const apiDepartamento = 'http://localhost:3000/departamento/'+req.body.departamento;

  // Realiza uma solicitação GET para a API usando o fetch
  fetch(apiDepartamento)
    .then(response => {
      // Verifica se a resposta da solicitação foi bem-sucedida
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados da API');
      }
      // Converte a resposta para JSON
      return response.json();
    })
    .then(data => {
      // Manipula os dados da resposta JSON
      console.log('Dados da API:', data);
    })
    .catch(error => {
      // Captura e lida com erros
      console.error('Erro:', error);
    });

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar."
            });
            return;
        }
        await repository.create(req.body)
        res.status(201).send("Criado com sucesso!")
    } catch (e) {
        res.status(500).send({
            message: "Erro no servidor, favor contactar o administrador."
        })
    }
}


exports.update = async (req, res, next) => {
    const id = req.params.id; //na rota daremos o apelido deste id

    await repository.update(id, res.body);

    //Enviar email informando que sofreu uma alteração

    res.status(200).send("Atualizado com sucesso!")
};

exports.delete = async (req, res, next) => {
    const id = req.params.id; //na rota daremos o apelido deste id
    await repository.delete(id); //Deletando um departamento pelo id
    res.status(200).send('Removido com sucesso!')
}


exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await repository.getById(id);

        if (data == null)
            res.status(404).send();

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Erro no servidor, favor contactar o administrador."
        });
    }
}


