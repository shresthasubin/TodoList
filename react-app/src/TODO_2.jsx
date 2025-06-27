import React, {useState} from 'react'

const TODO_2 = () => {
    localStorage.clear()
    if (!('Task' in localStorage)) {
        localStorage.setItem('Task',JSON.stringify([]))
    }
    const [list, setList] = useState(JSON.parse(localStorage.getItem('Task')))

  const listItem = {
      tasks: "",
      done: false,
      color: "red"
    }
    
    
    document.body.addEventListener('click', () => {
        document.getElementById("task-input-el").focus();
    })
    
    
    const handleAddTask = () => {
        const taskVal = document.getElementById('task-input-el').value
        if (taskVal.trim().length > 0) {
            setList(list.push({[listItem.tasks]: taskVal, [listItem.done]: false, [listItem.color]: 'red'}))
        }
        document.getElementById('task-input-el').value = ""
    }
    
    localStorage.setItem('Task',JSON.stringify(list))
  
  const handleDeleteTask = (index) => {
      setList(list.filter((_,i) => i !== index))
  }
  
//   const moveUp = (i) => {
//       const updatedList = [...list]
//       if (i > 0) {
//           [updatedList[i], updatedList[i-1]] = [updatedList[i-1], updatedList[i]]
//           setList([...updatedList])
//       }
//   }
  
  
//   const handleDone = (index) => {
//       // const style_up = [...done]
//       setList(list.map((item,i) => i === index ? item.done = true : item.done = item))
//       setList(list.map((item,i) => {
//           if (index===i) {
//               return item.done ? ([item.color] = "green" ): ([item.color]= "red")
//           } else {
//               return item.color
//           }
//       }))        
//   }
  
  
  
//   const moveDown = (i) => {
//       const updatedList = [...list]
//       if (i < tasks.length - 1) {
//           [updatedList[i], updatedList[i+1]] = [updatedList[i+1], updatedList[i]]
//           setList([...updatedList])
//       }
//   }

  
  return (
      <div className='todo-container'>
          <h2>TODO LIST</h2>
          <div className="input-container">
              <input type="text" id='task-input-el' placeholder="What's your next task?"/>
              <button onClick={() => handleAddTask()}>Add</button>
          </div>
          <ul>
              {
                  list.map((task,index) => {
                      return (
                          <li key={index}>
                              <p>{task.tasks}</p>
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

export default TODO_2
