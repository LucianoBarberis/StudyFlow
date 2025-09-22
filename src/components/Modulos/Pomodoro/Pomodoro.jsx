import React from 'react'
import { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound';
import './Pomodoro.css'
import { toast } from '@pheralb/toast';

const Pomodoro = () => {

    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState(true); // true = pomodoro, false = break
    const timerRef = useRef(null);
    const endTimeRef = useRef(null); // <-- guardamos el tiempo de finalización
    const [play] = useSound("./sounds/sound1.mp3");

    // Notificación cuando termina
    useEffect(() => {
        if (timeLeft === 0 && !isRunning) {
            toast.info({
                text: "Sesión finalizada",
            });
        }
    }, [timeLeft, isRunning]);

    useEffect(() => {
        if (isRunning) {
            // Si no hay un endTime definido, lo calculamos
            if (!endTimeRef.current) {
                endTimeRef.current = Date.now() + timeLeft * 1000;
            }

            timerRef.current = setInterval(() => {
                const diff = Math.max(
                    0,
                    Math.floor((endTimeRef.current - Date.now()) / 1000)
                );

                setTimeLeft(diff);

                if (diff <= 0) {
                    clearInterval(timerRef.current);
                    endTimeRef.current = null;
                    setIsRunning(false);
                    play();
                }
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning, play]);

    const startTimer = () => {
        if (!isRunning && timeLeft > 0) {
            setIsRunning(true);
            toast.info({ text: "Pomodoro Iniciado" });
        } else {
            setIsRunning(false);
            toast.info({ text: "Pomodoro Pausado" });
            // Guardamos cuánto quedaba por si reanuda
            endTimeRef.current = null;
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        endTimeRef.current = null; // Reiniciamos el final
        if (mode) {
            setTimeLeft(25 * 60);
        } else {
            setTimeLeft(5 * 60);
        }
    };

    const handlerOption = () => {
        setIsRunning(false);
        endTimeRef.current = null;
        if (mode) {
            setMode(false);
            setTimeLeft(5 * 60);
        } else {
            setMode(true);
            setTimeLeft(25 * 60);
        }
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className='div3 card'>
            <h2>Pomodoro</h2>
            <div className='containerClock'>
                <div className='clock'>
                    <p>
                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </p>
                </div>
                <div className='btns'>
                    <button className='btnPomo btn' onClick={startTimer}>
                        <p>
                            {!isRunning ? "Iniciar" : "Pausar"}
                        </p>
                    </button>
                    <button className='btnPomo btnSecondary btn' onClick={resetTimer}>Reset</button>
                </div>
                <div className='options'>
                    <button disabled={mode ? true : false} className={mode ? "activeOption btnOption" : "btnOption"} onClick={handlerOption}>Estudio</button>
                    <button disabled={!mode ? true : false} className={!mode ? "activeOption btnOption" : "btnOption"} onClick={handlerOption}>Descanso</button>
                </div>
            </div>
        </div>
    )
}

export default Pomodoro
