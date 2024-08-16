
## Autores

- [@danielpedroo](https://www.github.com/danielpedroo)
- [@pablohdev](https://www.github.com/pablohdev)


# Projeto - Wiki GitHub

Fala Devs :>, este projeto é baseado na trilha de **ensino conceitos de react** do bootcamp [XP Inc. - Full Stack Developer](https://www.dio.me/bootcamp/coding-the-future-xp-full-stack-developer), portanto pessoal este projeto visa o consumo da API do github, ou seja, dos seus repositorios locais usando nada mais nada menos que:

 - Axios <Pacote de consumo da Api>
 - Styled-Components <Pacote de estilização de componentes>


## Comandos

Este projeto ja contem os pacotes inferidos mas portanto, recomendo a você instalar os pacotes em seu projeto.:

- Styled-Componentes - ` npm add styled-components`
- Axios - ` npm add axios `


## Uso/Exemplos

Aqui pessoal deixo uma explicação das funções utilizadas e o porque destas.


```javascript
//Consumo da API

function App() {
  import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/".trim(),
});

```
```javascript
//Pesquisa e adição de repositorios

function App() {
  //Api - Json
  const [repos, setRepos] = useState([]);

  //Use State - Search
  const [currentRepo, setCurrentRepo] = useState("");

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`.trim());

    if (data.id) {
    //Verificador - Verifica se o repositorio a ser adicionado existe.
      const isExist = repos.find((repo) => repo.id === data.id);

      if (!isExist) {
        setRepos((prevRepo) => [...prevRepo, data]);
        setCurrentRepo("");
        return;
      }
    }
    alert("Repository Not Found 404");
  };
```
```javascript
    //Função de remover repositorios

    const handleRemoveRepo = (id) => {
    //Filtro que verifica se repo.id e diferente do id do item que sera removido.
    const updaterRepo = repos.filter((repo) => repo.id !== id);
    setRepos(updaterRepo);

   /*
   Portanto, se pensarmos desse ponto de vista, se eu substituísse 
   '!== diferente' por '=== igual'. repo.id seria o meu estado repos
    que contém os meus repositórios já escolhidos. Ou seja, a função remover seria
    inútil se comparada com 'igual (===)', pois ela iria verificar se o id do item existe 
    no estado repo. Entretanto, o filter retornaria o array modificado que satisfaz a condição.

    Agora, se considerarmos o ponto de vista de 'diferente ( !== )', na hora da pesquisa de itens,
    o repo.id, que contém os repositórios já escolhidos, irá comparar se existe alguém
    que seja diferente daquele id, ou seja:

    1 é igual a 1? -> true
    2 é igual a 2? -> true
    3 é igual a 2? -> false

    repo.id (123) é igual a id(569)? -> false

    Portanto, esse id for'diferente' é removido e, como resultado, um novo array será re-renderizado
    a partir do filter, pois ele satisfaz a condição, e setRepos(updaterepo) atualizará
    o repo, que é o estado inicial.
*/
  };
```

