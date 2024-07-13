import AddTodoForm from "@/components/AddTodoForm";
import TodosList from "@/components/todoslist";

export default function Home() {
  return (
    <>
      <h1>Working on a Todo App</h1>
      <div>
        <TodosList />
      </div>
    </>
  );
}
