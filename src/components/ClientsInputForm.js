import React, {useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import db from '../firebase';
import './ClientsInputForm.css'; 

const ClientsInputForm = (props) => {

    const initialStateValues = {
        nombres: '',
        apellidos: '',
        nacimiento: ''
    }
    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const {name, value} = e.target; 
        setValues({...values, [name]:value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        //console.log(values);
        props.addOrEditClient(values);
        setValues({...initialStateValues});
    }

    const getClientById = async (id) => {
        console.log(id);
        const docRef = doc(db, "clientes", id);
        const docSnap = await getDoc(docRef);
        setValues({...docSnap.data()}) 
    }

    useEffect(()=>{
        if (props.currentId===""){
            setValues({...initialStateValues});
        }else{
            console.log("Editing");
            getClientById(props.currentId);
        }
    },[props.currentId])

    return (
        <div className="form-client">
            <h2>Registro de Clientes</h2>
            <form onSubmit={handleSubmit} className="form-client__container">  
                <div>
                    <label htmlFor="cliente-nombres" className="form-client__label">Nombres:</label>
                    <input 
                        type="text"
                        id="cliente-nombre"
                        name="nombres"
                        onChange={handleInputChange}
                        value={values.nombres}
                        required
                        placeholder="Nombres:"
                        className="form-client__field"
                    />
                </div>
                <div>
                    <label htmlFor="cliente-apellidos" className="form-client__label">Apellidos:</label>
                    <input
                        type="text"
                        id="cliente-apellidos"
                        name="apellidos"
                        onChange={handleInputChange}
                        value={values.apellidos}
                        required
                        placeholder="Apeliidos:"
                        className="form-client__field"
                    />
                </div>
                <div>
                    <label htmlFor="cliente-nacimiento" className="form-client__label">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="cliente-nacimiento"
                        name="nacimiento"
                        onChange={handleInputChange}
                        value={values.nacimiento}
                        required
                        placeholder="Fecha de Nacimiento:"
                        className="form-client__field"
                    />
                </div>
                <div className="form-client__buttons">
                    <button className="form-client__button">
                        {props.currentId==''?'Agregar cliente ☞':'Actualizar cliente ✎ '}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ClientsInputForm;