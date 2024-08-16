import github from "../../assets/icon-github.svg";
import Input from "../../components/input/input";
import ItemRepo from "../../components/Item_Repo/repo";
import Button from "../../components/Button/button";
import { useState } from "react";
import { Container } from "./style";
import { api } from "../../services/api";

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

  const handleRemoveRepo = (id) => {
    const updaterRepo = repos.filter((repo) => repo.id !== id);
    setRepos(updaterRepo);
  };

  return (
    <Container>
      <img src={github} width={72} height={72} alt="gitHub_logo" />
      <Input
        value={currentRepo}
        onChange={(event) => setCurrentRepo(event.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
