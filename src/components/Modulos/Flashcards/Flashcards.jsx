import { useState, useEffect } from 'react';
import './Flashcards.css'
import { toast } from '@pheralb/toast';

const Flashcards = () => {
    // Inicializar estados con datos del localStorage
    const [mode, setMode] = useState(true);
    const [rotated, setRotated] = useState(false)
    let [cardIndex, setCardIndex] = useState(0)
    const [ cardForm, setCardForm] = useState({
        answer: "",
        response: "",
    })
    const [cards, setCard] = useState(() => {
        const savedCards = localStorage.getItem('flashcards');
        return savedCards ? JSON.parse(savedCards) : [];
    })
    const [idState, setIdState] = useState(0)

    // Guardar en localStorage cuando cambian las cards
    useEffect(() => {
        localStorage.setItem('flashcards', JSON.stringify(cards));
    }, [cards]);

    const handleInput = (e) => {
        const {name, value} = e.target
        setCardForm({...cardForm, [name]: value})
    }

    const handleForm = (e) =>{
        e.preventDefault()
        if(cardForm.answer == "" || cardForm.response == ""){
            toast.error({
                text: "Rellena todos los campos!"
            })
        }else {
            setCard([...cards, {
                ...cardForm,
                id: idState
            }])
            setCardForm({
                answer: "",
                response: ""
            })
            setIdState(idState + 1)
        }
    } 

    const handlerOption = () => {
        if(mode){
            setMode(false)
        }else {
            setMode(true)
        }
    }

    const nextCard = () => {
        if(cardIndex == cards.length-1){
            toast.info({
                text: "No hay mas Cards"
            })
        }else {
            if(rotated){
                setRotated(false)
                setTimeout(() => {
                    setCardIndex(cardIndex + 1)
                }, 275)
            }else {
                setCardIndex(cardIndex + 1)
            }
        }
    }

    const previusCard = () => {
        if(cardIndex == 0) {
            toast.info({
                text: "No hay mas Cards"
            })
        }else {
            if(rotated){
                setRotated(false)
                setTimeout(() => {
                    setCardIndex(cardIndex - 1)
                }, 275)
            }else {
                setCardIndex(cardIndex - 1)
            }
        }
    }

    const handleDelete = () => {
        const currentId = cards[cardIndex].id;
        setCard(cards.filter(card => card.id !== currentId));
        // Ajustar el índice si es necesario
        if (cardIndex >= cards.length - 1) {
            setCardIndex(Math.max(0, cards.length - 2));
        }
        setRotated(false);
    }

    return (
        <div className='div4 card'>
            <h2>FlashCards</h2>
            <div>
                <div className='opFlashcards options'>
                    <button disabled={mode ? true : false} className={mode ? "activeOption btnOption" : "btnOption"} onClick={handlerOption}>Card</button>
                    <button disabled={!mode ? true : false} className={!mode ? "activeOption btnOption" : "btnOption"} onClick={handlerOption}>Crear Cards</button>
                </div>
                {
                mode == true
                ?
                <div className='cardContainer'>
                    {cards.length == 0? <div className='noResouses'><h3 >No hay Cards</h3></div>:
                    <>
                        <div className="three-d-card">
                            <div className={rotated?"card-wrapper rotate":"card-wrapper"}>
                                <div className="card-face front">
                                    <div className='btnDeleteContainer'>
                                        <button 
                                            className='btnDelete' 
                                            onClick={handleDelete}
                                            title="Eliminar tarjeta"
                                        >
                                            <img src="/icons/basura.svg" alt="Eliminar" />
                                        </button>
                                    </div>
                                    <div className="card-content">
                                        <p className="card-description">{cards[cardIndex].answer}</p>
                                    </div>
                                    <div className='card-info'>
                                        <p>{cardIndex +1}/{cards.length}</p>
                                    </div>
                                </div>
                                <div className="card-face back">
                                    <div className="card-content">
                                        <p className="card-description">{cards[cardIndex].response}</p>
                                    </div>
                                    <div className='card-info'>
                                        <p>{cardIndex+1}/{cards.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='btnContainerCards'>
                            <button onClick={previusCard} className='btnSecondary btn btnFlash'> - </button>
                            <button className='btn' onClick={() => setRotated(!rotated)}>Rotar</button>
                            <button onClick={nextCard} className='btnSecondary btn btnFlash'> + </button>
                        </div>
                    </>
                    }
                </div>
                :
                <div className='cardCreateContainer'>
                    <form onSubmit={handleForm} action="">
                        <input
                        autoComplete='off'
                        type="text"
                        className='inputText'
                        placeholder='Pregunta...'
                        name='answer'
                        value={cardForm.answer}
                        onChange={handleInput}
                        />
                        <input
                        autoComplete='off'
                        type="text"
                        className='inputText'
                        placeholder='Respuesta...'
                        name='response'
                        value={cardForm.response}
                        onChange={handleInput}
                        />
                        <button className='btn'>+ Add</button>
                    </form>
                </div>
                }
            </div>
        </div>
    )
}

export default Flashcards
