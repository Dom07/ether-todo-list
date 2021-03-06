import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import TodoList from './components/TodoList/TodoList';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';
import NavBar from './components/NavBar/NavBar';
import TaskForm from './components/TaskForm/TaskForm';
import { Container } from 'react-bootstrap';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [account, setAccount] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    loadBlockChainData();
    return function cleanup() {
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

    for (let i = 1; i <= taskCount; i++) {
      const task = await taskList.methods.tasks(i).call()
      setTasks(tasks => [...tasks, task])
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    taskList.methods.createTask(newTask).send({ from: account })
      .once('receipt', (receipt) => {
        setTasks([...tasks, {id: taskCount+1, content: newTask, completed: false}])
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
    taskList.methods.toggleCompleted(id).send({ from: account })
      .once('receipt', (receipt) => {
        setNewTask("")
      })
  }

  return (
    <Container>
      <NavBar account={account}></NavBar>
      
        <div className="App">
          <p>Total Tasks: {taskCount}</p>

          <TaskForm 
                taskName = {newTask}
                submitAction = {onSubmit} 
                taskNameChange = {changeHandler}/>

          <TodoList
            todos={tasks}
            toggle={taskToggler} />
        </div>
      </Container>
  );
}

export default App;
