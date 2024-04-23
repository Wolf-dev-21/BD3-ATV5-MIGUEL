// Listagem livros e autores
const alunoList = document.querySelector('#aluno-list');

function renderAluno(doc){

//criação elementos HTML
let li = document.createElement('li');
let nome = document.createElement('span');
let cpf = document.createElement('span');
let rg = document.createElement('span');
let tel_aluno = document.createElement('span');
let tel_respo = document.createElement('span');
let email = document.createElement('span');
let data_nasc = document.createElement('span');

let excluir = document.createElement('div');

excluir.textContent = 'X'

//carrega dados no elemento HTMl
li.setAttribute('data-id', doc.id);
nome.textContent = doc.data().nome;
cpf.textContent = doc.data().cpf;
rg.textContent = doc.data().rg;
tel_aluno.textContent = doc.data().tel_aluno;
tel_respo.textContent = doc.data().tel_respo;
email.textContent = doc.data().email;
data_nasc.textContent = doc.data().data_nasc;

//add dados de autor e titulo em LI
li.appendChild(nome);
li.appendChild(cpf);
li.appendChild(rg);
li.appendChild(tel_aluno);
li.appendChild(tel_respo);
li.appendChild(email);
li.appendChild(data_nasc);
li.appendChild(excluir);

/* trata a ação do clique no X paa exluir o arquivo */
excluir.addEventListener('click', (event)=>{
    event.stopPropagation();

    let id = event.target.parentElement.getAttribute('data-id');
    //alert(id);
    db.collection('bd3-nosql-atv5').doc(id).delete()
    .then(()=>{window.location.reload()})

});

//add o LI em UL
alunoList.appendChild(li);

}


db.collection('bd3-nosql-atv5')
    .get()
    .then(
        (snapshot)=>{
            // console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                renderAluno(doc)
                console.log(doc.data());

            });
        }
    )

//inserção de livro e autor

const form = document.querySelector('#add-aluno-form');

form.addEventListener('submit', (event)=> {

    event.preventDefault();

    // console.log(form.autor.value);

    db.collection('bd3-nosql-atv5').add({
        nome: form.nome.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        tel_aluno: form.tel_aluno.value,
        tel_respo: form.tel_respo.value,
        email: form.email.value,
        data_nasc: form.data_nasc.value
    }).then(()=>{
        form.nome.value= '';
        form.cpf.value= '';
        form.rg.value= '';
        form.tel_aluno.value= '';
        form.tel_respo.value= '';
        form.email.value= '';
        form.data_nasc.value= '';
        window.location.reload();
    });
});