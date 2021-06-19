export default function useTodo() {
  const getTodoList = () => {
    const storage = window.localStorage.getItem('list');
    const list = storage ? JSON.parse(storage) : [];

    return list;
  };

  return {
    getTodoList,
  };
}
