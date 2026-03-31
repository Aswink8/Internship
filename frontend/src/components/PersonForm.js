import React,{ useState,useEffect } from "react";
import API from "../api";
import axios from "axios";

function PersonForm({fetchPersons,editingPerson,setEditingPerson}){
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [ place,setPlace] = useState("");
    const [image,setImage] = useState(null);

    useEffect(()=>{
        if(editingPerson){
            setName(editingPerson.name);
            setAge(editingPerson.age);
            setPlace(editingPerson.place);
        }
    },[editingPerson]);

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("name",name);
        formData.append("age",parseInt(age));
        formData.append("place",place);
        formData.append("image",image);

        try{
            await axios.post("https://127.0.0.1:8000/api/persons/",formData,{
                headers: {
                    "Content-Type":"multipart/form-data",
                },
            });
        }catch (error) {
            console.log(error.response?.data);
        }

        if(editingPerson){
            await API.put(`persons/${editingPerson.id}/`,formData);
            setEditingPerson(null);
        }else{
            await API.post("persons/",formData);
        }

        setName("");
        setAge("");
        setPlace("");
        setImage(null);

        fetchPersons();
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="number" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
            <input type="text" placeholder="Place" value={place} onChange={(e)=>setPlace(e.target.value)}/>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>

            <button type="submit">
                {editingPerson ? "Update":"Add"}
            </button>
        </form>
    );
}

export default PersonForm;