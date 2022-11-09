import React, {useEffect, useState} from "react";
import ClientsInputForm from "./ClientsInputForm";
import db from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
import './ContainerForms.css';

const ContainerForms = () => {

    const [clients, setClients] = useState([]);

    const [currentId, setCurrentId] = useState("");

    const addOrEditClient = async (object) => {
        
        try {
            if(currentId === ""){
                await addDoc(collection(db, "clientes"), object);
                console.log('New Client Added');
            }else{
                await updateDoc(doc(db, "clientes",currentId), object);
            }
            setCurrentId("");
        } catch(error) {
            console.error(error)
        }
        
    }

    const deleteClient = async (id) => {
        if(window.confirm("¿Seguro Desea eliminar al cliente?")){
            console.log(id);
            await deleteDoc(doc(db, "clientes",id));
        }
    }
    const getClients = async () => {

        onSnapshot(collection(db, "clientes"), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(),id:doc.id});
            });
            setClients(docs);
        });   
          
    }

    const getAge = dateString => {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const getPromedio = () => {
        let promedio = clients.reduce((acc, client)=>
                    acc+getAge(client.nacimiento),0)/clients.length
        return promedio;
    }

    const getDesviacion = () => {
        let desvi = Math.sqrt(clients.reduce((acc, client)=>
                    acc+Math.pow((getAge(client.nacimiento)-getPromedio()),2),0)/clients.length)
        return desvi;
    }
    


    useEffect(()=>{
        getClients();
    },[])

    return (
        <div className="container">
            <ClientsInputForm {...{addOrEditClient, currentId, clients}}></ClientsInputForm>
            <div class="container__report">
                <h2>Clientes Registrados</h2>
                <div className="client-container">
                <div class="client">
                    <div className="client__name"><strong>Nombres</strong></div>
                    <div className="client__lastname"><strong>Apellidos</strong></div>
                    <div className="client__birthdate"><strong>F. Nacimiento</strong></div>
                    <div className="client__age"><strong>Edad</strong></div>
                    <div className="client__options"></div>
                </div>
                {clients.map(client=>(
                    <div key={client.id} className="client">
                        <div className="client__name">{client.nombres}</div>
                        <div className="client__lastname">{client.apellidos}</div>
                        <div className="client__birthdate">{client.nacimiento}</div>
                        <div className="client__age">{getAge(client.nacimiento)} Años</div>
                        <div className="client__options">
                            <button onClick={()=>deleteClient(client.id)} className="client__button">× Eliminar</button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div class="container__report">
                <h2>Estadistica de Clientes</h2>
                <h3>Edad Promedio:&nbsp;

                {Math.round(getPromedio())} años

                </h3>
                <h3>Desviación Estandar:&nbsp;
                {getDesviacion()}    
               

                </h3>  
            </div>
        </div>
        
    )
}

export default ContainerForms;