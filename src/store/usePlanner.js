import { create } from "zustand";
import { persist } from "zustand/middleware";



export const usePlanner = create(persist(
        (set)=>({
        tasks: [],
        addTask: (payload)=>set((state)=>({
            tasks: [...state.tasks, payload]
        })), 
        deleteTask: (id)=>set((state)=>({
            tasks: state.tasks.filter((task)=>task.id !== id)
        })),
        updatedStatus: (id, status)=>set((state)=>({
            tasks: state.tasks.filter((task)=>{
                if(task.id == id)
                    task.status = status

                return task
            } )
        })), 
        deleteAllTasks: ()=>set(()=>({
            tasks: []
        })), 
    }),
    {name: "planner"}
))