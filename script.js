//verificar se já existe algo salvo no LocalStorage.
    document.addEventListener("DOMContentLoaded", () => {
        const dadosSalvos = localStorage.getItem("cadastroPessoal");

        //validações para verificar as informações salvas do usuário
        if(dadosSalvos) {
            const usuario = JSON.parse(dadosSalvos);

    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("sobrenome").value = usuario.sobrenome || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("telefone").value = usuario.telefone || "";
    document.getElementById("cep").value = usuario.cep || "";
    document.getElementById("logradouro").value = usuario.logradouro || "";
    document.getElementById("bairro").value = usuario.bairro || "";
    document.getElementById("cidade").value = usuario.cidade || "";
    document.getElementById("uf").value = usuario.uf || "";
    document.getElementById("numero").value = usuario.numero || "";
        }
        })



//adicionando evento ao sair do input "CEP"
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    //verificar se o CEP inserido é válido
    if(!(cepInformado.length === 8)) {
        alert("Insira um CEP válido.")
        return;
    }

    //realizar a busca no ViaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json`)
        .then(response => response.json())
        .then(data => {
            //processamento dos dados recebidos
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
            }   else {
                alert("CEP não encontrado. Tente novamente com outro CEP.")
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP inserido!", error));
})

//previnindo o comportamento padrão do form
    document.querySelector("form").addEventListener("submit", (evento) => {
        evento.preventDefault();

//criando o objeto usuario para salvar no localStorage

const usuario = {
    Nome:document.getElementById("nome").value,
    Sobrenome:document.getElementById("sobrenome").value,
    Email:document.getElementById("email").value,
    Telefone:document.getElementById("telefone").value,

    Cep:document.getElementById("cep").value,
    Logradouro:document.getElementById("logradouro").value,
    Bairro:document.getElementById("bairro").value,
    Cidade:document.getElementById("cidade").value,
    Estado:document.getElementById("uf").value,
    Numero:document.getElementById("numero").value,
};

    localStorage.setItem("cadastroPessoal", JSON.stringify(usuario));
    alert("Cadastro realizado com sucesso!")
});