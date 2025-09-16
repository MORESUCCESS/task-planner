import 'animate.css';
import { Badge, Card, Form, Input, Modal, Select, Tag, Button, DatePicker, Empty, Popconfirm } from 'antd';
import { Delete, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePlanner } from './store/usePlanner';
import '@ant-design/v5-patch-for-react-19';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';

const desc = "Learn How to Quickly Generate Placeholder Text Using a Lorem Ipsum Tool. Explore How Lorem Ipsum Generators Can Liven up Your Web Layout Wireframes and Mockups. 100+ Templates. A/B Testing & Surveys."

const App = ()=>{
  const [form] = useForm()
  const [open, setOpen] = useState(false)
  const [timer, setTimer] = useState(new Date().toLocaleTimeString())
  const {tasks, addTask, deleteTask, updatedStatus, deleteAllTasks} = usePlanner()
  const highestTask = tasks.filter((item)=>item.priority === "highest")
  const mediumTask = tasks.filter((item)=>item.priority === "medium")
  const lowestTask = tasks.filter((item)=>item.priority === "lowest")


  const createTask = (value)=>{
    value.status = "pending"
    value.id = Date.now()
    value.createdAt = new Date()
    addTask(value)
    handleClose()
  }

  const handleClose = ()=>{
    setOpen(false)
    form.resetFields()
  }

  useEffect(()=>{
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString())
    }, 1000);

    return ()=>{
      clearInterval(interval)
    }
  }, [])


  return(
    <div className="h-screen bg-gray-200 overflow-hidden">
      <nav className='text-white bg-gradient-to-r from-rose-500 via-slate-800 to-slate-900 h-[60px] fixed left-0 top-0 w-full flex justify-between items-center px-8'>
        <div className='flex items-center'>
          <button 
          className='w-10 h-10 bg-[radial-gradient(circle_at_center,_hsl(44.5,_78.56052532924392%,_58.28726600401578%)_0%,_hsl(182.0,_84.91011818677582%,_57.29348846116649%)_50%,_hsl(319.5,_73.4713192905786%,_40.82189409222452%)_100%)] rounded-full text-white font-bold'>
            PL
          </button>
            <h1 className='text-2xl font-bold ml-px'>anner</h1>
        </div>

        <div className='flex gap-5 items-center'>
          <h1 className='font-bold text-2xl lg:block hidden'>{timer}</h1>
          <DatePicker className='!py-1.5'/>
           <button 
              onClick={()=>setOpen(true)}
              className='focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white font-medium flex gap-1'
            >
              <Plus className='w-4 h-4'/>
              Add task
            </button>

            <Popconfirm onConfirm={()=>deleteAllTasks()} title='Do you want to delete all tasks?'>
              <button
              className='focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-red-600 via-rose-500 to-red-600 text-white font-medium flex gap-1'
            >
              <Delete className='w-4 h-4'/>
              Delete all tasks
            </button>
            </Popconfirm>
        </div>

      </nav>

      <section className='h-[calc(100%-120px)] fixed left-0 top-[60px] w-full overflow-x-auto overflow-y-visible grid lg:grid-cols-3 gap-8 p-8'>
        <div className='lg:h-full lg:min-h-0 h-[300px]'>
          <Badge.Ribbon 
            text="Highest" 
            className='!bg-gradient-to-br !from-rose-500 !via-pink-500 !to-rose-500 !font-medium !z-20000'
          />

          <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8'>
            <div className='flex flex-col gap-8'>
               {
                highestTask.length === 0 &&
                (
                  <>
                    <Empty description="There is no task added as highest priority at the momemt"/>
                    <button 
                      onClick={()=>setOpen(true)}
                      className='w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white font-medium flex gap-1'
                    >
                      <Plus className='w-4 h-4'/>
                      Add task
                    </button>
                  </>
                )
              }
              {
                highestTask.map((item, index)=>(
                  <Card hoverable key={index}>
                    <Card.Meta 
                      title={item.title}
                      description={item.description}
                    />
                    <div className='mt-4 flex justify-between items-center'>
                      <div>
                        {
                          item.status === "pending" && 
                          <Tag className='capitalize' color='lime'>{item.status}</Tag>
                        }
                        {
                          item.status === "inProgress" && 
                          <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                        }
                        {
                          item.status === "completed" && 
                          <Tag className='capitalize' color='magenta'>{item.status}</Tag>
                        }
                        
                        <Popconfirm title='Do you want to delete this task?'onConfirm={()=>deleteTask(item.id)}>
                          <Tag className='!bg-rose-500 !border !border-rose-500 !text-white'>Delete</Tag>
                        </Popconfirm>
                        
                      </div>
                      <Select size='small' placeholder="Change Status" onChange={(status) => updatedStatus(item.id, status)}>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">In Progress</Select.Option>
                        <Select.Option value="completed">Completed</Select.Option>
                      </Select>
                    </div>
                    <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>
          <Badge.Ribbon 
            text="Medium" 
            className='!bg-gradient-to-br !from-indigo-500 !via-blue-500 !to-indigo-500 !font-medium !z-20000'
          />

          <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8'>
            <div className='flex flex-col gap-8'>
               {
                mediumTask.length === 0 &&
                (
                  <>
                    <Empty description="There is no task added as medium priority at the momemt"/>
                    <button 
                      onClick={()=>setOpen(true)}
                      className='w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white font-medium flex gap-1'
                    >
                      <Plus className='w-4 h-4'/>
                      Add task
                    </button>
                  </>
                )
              }
             {
                mediumTask.map((item, index)=>(
                  <Card hoverable key={index}>
                    <Card.Meta 
                      title={item.title}
                      description={item.description}
                    />
                    <div className='mt-4 flex justify-between items-center'>
                      <div>
                        {
                          item.status === "pending" && 
                          <Tag className='capitalize' color='lime'>{item.status}</Tag>
                        }
                        {
                          item.status === "inProgress" && 
                          <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                        }
                        {
                          item.status === "completed" && 
                          <Tag className='capitalize' color='magenta'>{item.status}</Tag>
                        }
                        
                        <Popconfirm title='Do you want to delete this task?'onConfirm={()=>deleteTask(item.id)}>
                          <Tag className='!bg-rose-500 !border !border-rose-500 !text-white'>Delete</Tag>
                        </Popconfirm>
                      </div>
                      <Select size='small' placeholder="Change Status" onChange={(status) => updatedStatus(item.id, status)}>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">In Progress</Select.Option>
                        <Select.Option value="completed">Completed</Select.Option>
                      </Select>
                    </div>
                    <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>
          <Badge.Ribbon 
            text="Lowest" 
            className='!bg-gradient-to-br !from-amber-500 !via-orange-500 !to-amber-500 !font-medium !z-20000'
          />

          <div className='bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8'>
            <div className='flex flex-col gap-8'>
              {
                lowestTask.length === 0 &&
                (
                  <>
                    <Empty description="There is no task added as lowest priority at the momemt"/>
                    <button 
                      onClick={()=>setOpen(true)}
                      className='w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate duration-300 items-center text-sm py-2 px-3 rounded bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600 text-white font-medium flex gap-1'
                    >
                      <Plus className='w-4 h-4'/>
                      Add task
                    </button>
                  </>
                )
              }
              {
                lowestTask.map((item, index)=>(
                  <Card hoverable key={index}>
                    <Card.Meta 
                      title={item.title}
                      description={item.description}
                    />
                    <div className='mt-4 flex justify-between items-center'>
                      <div>
                        {
                          item.status === "pending" && 
                          <Tag className='capitalize' color='lime'>{item.status}</Tag>
                        }
                        {
                          item.status === "inProgress" && 
                          <Tag className='capitalize' color='geekblue'>{item.status}</Tag>
                        }
                        {
                          item.status === "completed" && 
                          <Tag className='capitalize' color='magenta'>{item.status}</Tag>
                        }
                        
                        <Popconfirm title='Do you want to delete this task?'onConfirm={()=>deleteTask(item.id)}>
                          <Tag className='!bg-rose-500 !border !border-rose-500 !text-white'>Delete</Tag>
                        </Popconfirm>
                      </div>
                      <Select size='small' placeholder="Change Status" onChange={(status) => updatedStatus(item.id, status)}>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inProgress">In Progress</Select.Option>
                        <Select.Option value="completed">Completed</Select.Option>
                      </Select>
                    </div>
                    <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</label>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      <footer className='text-white bg-gradient-to-l from-rose-500 via-slate-800 to-slate-900 h-[60px] fixed left-0 bottom-0 w-full flex px-8 items-center justify-between'>
          <h1 className='font-bold text-2xl'>Total tasks - {tasks.length}</h1>
          <a href="https://www.ms2dwrld.com"
            className='hover:underline'
          >www.ms2dwrld.com</a>
      </footer>
      <Modal open={open} footer={null} onCancel={handleClose} maskClosable={false}>
        <h1 className='text-lg font-medium mb-3'>New task</h1>
          <Form onFinish={createTask} form={form} initialValues={{description: desc}}>
            <Form.Item
              name="title"
              rules={[{required: true}]}
            >
              <Input
                placeholder='Task name'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{required: true}]}
            >
              <Input.TextArea
                placeholder='Task description goes here'
                rows={5}
              />
            </Form.Item>

             <Form.Item
              name="priority"
              rules={[{required: true}]}
            >
              <Select size='large' placeholder="Choose priority">
                <Select.Option value="highest">Highest</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="lowest">Lowest</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' type='primary'  size='large'>Submit</Button>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default App;