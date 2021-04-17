import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import TodoList from './components/TodoList/TodoList';
import './App.css';
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from './config';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [account, setAccount] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadBlockChainData();
    return function cleanup(){
      setTasks([]);
      setTaskList([]);
    }
  }, [])


  const loadBlockChainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    
    const taskList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    setTaskList(taskList);

    const taskCount = await taskList.methods.taskCount().call();
    setTaskCount(taskCount);

    for(let i = 1; i <= taskCount; i++){
      const task = await taskList.methods.tasks(i).call()
      setTasks(tasks => [...tasks, task])
    }
  }

  const onSubmit = (event) =>{
    event.preventDefault()
    taskList.methods.createTask(newTask).send({from: account})
    .once('receipt', (receipt) => {
      setNewTask("")
    })
  }

  const changeHandler = (event) => {
    setNewTask(event.target.value);
  }

  const taskToggler = (id) => {
    const copy = [...tasks];
    const index = copy.findIndex(item => item.id === id);
    console.log(index)
    copy[index].completed = copy[index].completed ? false : true;
    setTasks(copy)
    taskList.methods.toggleCompleted(id).send({from: account})
    .once('receipt', (receipt) => {
      setNewTask("")
    })
  }

  return (
    <div className="App">
        <h1>Hello World!!</h1>
        <p>Account: {account}</p>
        <p>TaskCount: {taskCount}</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <input type="text" placeholder="Enter task here" onChange={(e) => changeHandler(e)}></input>
          <input type="submit" value="Add"></input>
        </form>
        <TodoList 
          todos={tasks}
          toggle={taskToggler}/>
    </div>
  );
}

export default App;
