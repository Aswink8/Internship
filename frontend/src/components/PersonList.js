import React from "react";
import API from "../api";

function PersonList({persons,fetchPersons,setEditingPerson}){
    const handleDelete = async(id)=>{
        try{
            await API.delete(`persons/${id}/`);
            fetchPersons();
        }catch (error) {
            console.log(error.response?.data);
        }
    };

    return(
        <div>
            {persons.map((person)=>(
                <div key={person.id} style={{border:"1px solid black",margin:"10px"}}>
                    <h3>{person.name}</h3>
                    <p>Age:{person.age}</p>
                    <p>Place:{person.place}</p>

                    <img
                        src={`http://127.0.0.1:8000${person.image}`}
                        width="100"
                        alt=""
                    />

                    <br/>

                    <button onClick={()=>setEditingPerson(person)}>Edit</button>
                    <button onClick={()=>handleDelete(person.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default PersonList;