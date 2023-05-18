import React, { useEffect, useState } from 'react'

const URLBASE = "https://assets.breatheco.de/apis/fake/todos/user/victorpantin"

const Home = () => {
	
	const [allTasks, setAllTasks] = useState([])

	const [task,setTask] = useState("")

    const handleChange = (event) => {
		setTask(event.target.value)
    }

	const handleSubmit = async (event) => {
		event.preventDefault()
		}

	const handleAddTask = async (event) => {
		try {
			if (event.key === "Enter") {
			  let response = await fetch(`${URLBASE}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([...allTasks, { label: task, done: false }]),
			  })
			  if (response.ok) {
				getTask()
			    setTask("")
				
			  } else {
				console.log("error");
			  }
			}
		  } catch (err) {
			console.log(err);
		  }
    }

	const handleDeleteTask = async (id) => {
		try{
			let newTask = allTasks.filter((_,index)=> index != id)

			let response = await fetch(`${URLBASE}`, 
			{
				method:'PUT',
				headers:{"Content-Type": "application/json"},
				body:JSON.stringify(newTask)
			})

			if(response.ok){
				getTask()
			}

			console.log(response)

		}catch(err){
			console.log(err)
		}

	}


	const getTask = async () => {
		try{
			let response = await fetch(`${URLBASE}`)
			let data = await response.json()

			if(response.status == 404){
				console.log("debes crear usuario")
				createUser()
			}else{
				setAllTasks(data)
			}



		}catch(err){
			console.log(err)
		}

	}

	const createUser = async () => {
		try{
			let response = await fetch(`${URLBASE}`, 
			{
				method:'POST',
				headers:{"Content-Type": "application/json"},
				body:JSON.stringify([])
			})

			if(response.ok){
				getTask()
			}

			console.log(response)

		}catch(err){
			console.log(err)
		}

	}

	useEffect(() => {
		getTask()
	}, [])

	return (
		<>
            <div className='container'>
				<div className='row'>
					<div className='col-12 col-md-7'>
						<h1>ToDos</h1>
			            <div className='contenedor'>
							<form onKeyDown={handleAddTask} onSubmit={handleSubmit}>
						        <input value={task} 
								       type='text' 
									   placeholder='What needs to be done?' 
									   className='input form-control' 
									   name='task' 
									   onChange={handleChange}/>
					        </form>
							{
							    allTasks.map((item, index) => {
							    return (<p onClick={() =>handleDeleteTask(index)} key={index}>{item.label}</p>)
							    })
					        }
							<div className='task'>{allTasks.length} item left</div>
				        </div>
					</div>
				</div>
			</div>
		</>
	)
};

export default Home;
