import React, { useState, useEffect } from 'react'
import { toast } from "@pheralb/toast";
import './Resouces.css'

const Resouces = () => {
    const [recursos, setRecursos] = useState(() => {
        const savedRecursos = localStorage.getItem('recursos');
        return savedRecursos ? JSON.parse(savedRecursos) : [];
    });
    let [ids, setIds] = useState(() => {
        const savedIds = localStorage.getItem('recursosIds');
        return savedIds ? parseInt(savedIds) : 0;
    });
    const [dataForm, setDataForm] = useState({
        name: "",
        link: "",

    })
    
    const handleForm = (e) => {
        const { name, value } = e.target;
        setDataForm({...dataForm, [name]: value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(dataForm.name == "" || dataForm.link == ""){
            toast.error({
                text: "Rellena todos los campos!"
            })
        }else {
            if(!dataForm.link.includes("https://")) {
                dataForm.link = "https://" + dataForm.link
            }
            if(!dataForm.link.includes(".com")){
                dataForm.link = dataForm.link + ".com"
            }
            setRecursos([
                ...recursos,
                {
                    name: dataForm.name,
                    link: dataForm.link,
                    id: ids
                }
            ])
            setIds(ids + 1)
            setDataForm({
                name: "",
                link: "",
            })
        }
    }

    const handleDelete = (id) => {
        setRecursos(recursos.filter(recurso => recurso.id !== id))
    }

    // Guardar en localStorage cuando cambian los recursos o ids
    useEffect(() => {
        localStorage.setItem('recursos', JSON.stringify(recursos));
        localStorage.setItem('recursosIds', ids.toString());
    }, [recursos, ids]);

    return (
        <section className='div6 card'>
            <h2>Recursos & Links</h2>
            <form className='formResouces' onSubmit={handleSubmit}>
                <input
                    className='inputText'
                    name='name' 
                    value={dataForm.name} 
                    type="text"
                    onChange={handleForm}
                    autoComplete='off'
                    placeholder='Nombre del recurso...'
                    maxLength={30}
                />
                <input
                    className='inputText'
                    name='link' 
                    value={dataForm.link} 
                    type="text"
                    onChange={handleForm}
                    autoComplete='off'
                    placeholder='URL...'
                    maxLength={60}
                />
                <button className='btn' type='submit'>+ Add</button>
            </form>
            <div className='resousesContainer'>
                {
                recursos.length == 0
                ?   <div className='noResouses'>
                        <h3>No hay Recursos :(</h3>
                    </div> 
                :recursos.map((recurso)=> {
                    return(
                        <div className='recursoCard' key={recurso.id}>
                            <div className='recursosData'>
                                <p>{recurso.name}</p>
                                <a href={recurso.link} target='_blank'>{recurso.link}</a>
                            </div>
                            <div className='recursosBtns'>
                                <a href={recurso.link} target='_blank'>
                                    <img src="/icons/icons8-enlace-externo.svg" alt="" />
                                </a>
                                <button className='btnDelete' onClick={() => handleDelete(recurso.id)}>
                                    <img src="/icons/basura.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Resouces
