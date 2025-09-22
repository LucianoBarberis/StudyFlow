import React from 'react'
import Resouces from '../Modulos/Resouces/Resouces'
import './GridLayout.css'
import Pomodoro from '../Modulos/Pomodoro/Pomodoro'
import TodoList from '../Modulos/Todo/TodoList'
import Flashcards from '../Modulos/Flashcards/Flashcards'
import FastNotes from '../Modulos/FastNotes/FastNotes'

const GridLayout = () => {
    return (
        <main className='gridLayout'>
            <TodoList/>
            <Pomodoro />
            <Flashcards />
            <FastNotes />
            <Resouces />
        </main>
    )
}

export default GridLayout
