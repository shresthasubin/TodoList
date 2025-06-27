import React, { useEffect, useState } from 'react';


const TODO_List = () => {
    // localStorage.clear()
    if (!('Task' in localStorage) && !('Done' in localStorage) && !('Color' in localStorage)) {
        localStorage.setItem('Task',JSON.stringify([]))
        localStorage.setItem('Done',JSON.stringify([]))
        localStorage.setItem('Color',JSON.stringify([]))
    }

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('Task')))
    const [done, setDone] = useState(JSON.parse(localStorage.getItem('Done')))
    const [color, setColor] = useState(JSON.parse(localStorage.getItem('Color')))

    
    document.body.addEventListener('click', () => {
        document.getElementById("task-input-el").focus();
    })

    
    const handleAddTask = () => {
        const taskVal = document.getElementById('task-input-el').value
        if (taskVal.trim().length > 0) {
            setTasks(t => [...t,taskVal])
            setDone(d => [...d,false])
            setColor(c => [...c,'red'])
        }
        document.getElementById('task-input-el').value = ""
    }
    
    
    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_,i) => i !== index))
        setDone(done.filter((_,i) => i !== index))
        setColor(color.filter((_,i) => i !== index))
    }
    
    const moveUp = (i) => {
        if (i > 0) {
            setTasks(prev => {
                const copy = [...prev];
                [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
                return copy;
            });
    
            setDone(prev => {
                const copy = [...prev];
                [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
                return copy;
            });
    
            setColor(prev => {
                const copy = [...prev];
                [copy[i], copy[i - 1]] = [copy[i - 1], copy[i]];
                return copy;
            });
        }
    };
    
    
    
    const handleDone = (index) => {
        // const style_up = [...done]
        setDone(done.map((val,i) => i === index ? !val : val))
        setColor(color.map((_,i) => {
            if (index===i) {
                return !done[index]? "green" : "red"
            } else {
                return color[i]
            }
        }))        
    }
    
    
    const moveDown = (i) => {
        if (i < tasks.length - 1) {
            setTasks(prev => {
                const copy = [...prev];
                [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
                return copy;
            });
    
            setDone(prev => {
                const copy = [...prev];
                [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
                return copy;
            });
    
            setColor(prev => {
                const copy = [...prev];
                [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
                return copy;
            });
        }
    };
    
    useEffect (() => {
        localStorage.setItem('Task',JSON.stringify([...tasks]))
        localStorage.setItem('Done',JSON.stringify([...done]))
        localStorage.setItem('Color',JSON.stringify([...color]))
    },[tasks,done,color])
    
    return (
        <div className='todo-container'>
            <h2>TODO LIST</h2>
            <div className="input-container">
                <input type="text" id='task-input-el' placeholder="What's your next task?"/>
                <button onClick={() => handleAddTask()}>Add</button>
            </div>
            <ul>
                {
                    tasks.map((task,index) => {
                        return (
                            <li key={index}>
                                <p>{task}</p>
                                <div className="upt-btn-el">
                                    <button onClick={() => handleDeleteTask(index)}>Delete</button>
                                    <button style ={{backgroundColor: color[index]}} onClick={() => handleDone(index)}>Done</button>
                                    <button onClick={() => moveUp(index)}>Up</button>
                                    <button onClick={() => moveDown(index)}>Down</button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default TODO_List