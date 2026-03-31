import React,{ useEffect,useState } from "react";
import API from "./api";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

function App(){
  const [persons,setPersons] = useState([]);
  const [editingPerson,setEditingPerson] = useState(null);

  const fetchPersons = async ()=> {
    const res = await API.get("persons/");
    setPersons(res.data);
  };

  useEffect(()=>{
    fetchPersons();
  },[]);

  return(
    <div>
      <h1>Person CRUD</h1>

      <PersonForm
        fetchPersons={fetchPersons}
        editingPerson={editingPerson}
        setEditingPerson={setEditingPerson}
      />

      <PersonList
        persons={persons}
        fetchPersons={fetchPersons}
        setEditingPerson={setEditingPerson}
      />
    </div>  
  );
}

export default App;