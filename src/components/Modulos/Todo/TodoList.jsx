import { toast } from '@pheralb/toast'
import React, { useState, useEffect } from 'react'
import './TodoList.css'

const TodoList = () => {
    const [ taskToDo, setTaskToDo ] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    let [ids, setIds] = useState(() => {
        const savedIds = localStorage.getItem('taskIds');
        return savedIds ? parseInt(savedIds) : 0;
    });

    const [ tarea, setTarea] = useState("")

    const handleInput = (e)=> {
        setTarea(e.target.value)
    }
    
    const handlerSubmit = (e) =>{
        e.preventDefault()
        if(tarea.length > 0) {
            setTaskToDo([...taskToDo, {task: tarea, id: ids, checked: false}])
            setTarea("")
            setIds(ids+1)
        }else {
            toast.error({
                text: "Rellena todos los campos!"
            })
        }
    }

    const handlerCheckBox = (id) => {
        setTaskToDo(taskToDo.map(tarea =>
            tarea.id === id ? { ...tarea, checked: !tarea.checked } : tarea
        ));
    }

    const handleDelete = (id) => {
        setTaskToDo(taskToDo.filter(tarea => tarea.id !== id));
    }

    // Guardar en localStorage cuando cambian las tareas o ids
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskToDo));
        localStorage.setItem('taskIds', ids.toString());
    }, [taskToDo, ids]);

    return (
        <div className='div2 card'>
            <h2>To-Do List</h2>
            <div className='containerList'>
                <div className='input'>
                    <form onSubmit={handlerSubmit}>
                        <input
                            className='inputText'
                            type="text"
                            value={tarea}
                            onChange={handleInput}
                            name="tarea"
                            placeholder='Tarea...'
                            autoComplete='off'
                            maxLength={40}
                        />
                        <button className='btnPomo btn'>+ Add</button>
                    </form>
                </div>
                <div className='list'>
                    <ul>
                        {
                            taskToDo.length == 0?
                            <div className='noResouses'>
                                <h3>No hay Tareas :(</h3>
                            </div>
                            :taskToDo.map((tarea)=>{
                                return( 
                                <div className='itemTask' key={tarea.id}>
                                    <div className="task-content">
                                        <input 
                                            checked={tarea.checked} 
                                            type="checkbox" 
                                            onChange={() => handlerCheckBox(tarea.id)}
                                        />
                                        <li className={tarea.checked ? "checked" : ""}>
                                            {tarea.task}
                                        </li>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(tarea.id)} 
                                        className="btnDelete"
                                        title="Eliminar tarea"
                                    >
                                        <img src="/icons/basura.svg" alt="Eliminar tarea" />
                                    </button>
                                </div>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoList
