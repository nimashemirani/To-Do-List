import Task from "@/classes/Task";

interface TaskComponentProps {
  task: Task;
}

const TaskComponent = ({ task }: TaskComponentProps) => {

let aaa=()=>{
  //alert('changed')
}

  return (
    <>
      <div className="border-solid border-2 border-indigo-600 hover:border-dashed rounded m-3 p-3">
        <span className="me-5">{task.name}</span>
        <input type="checkbox" checked={task.isCompleted} onChange={aaa} />
      </div>
    </>
  );
};

export default TaskComponent;
