import Image from "next/image";
import Todo from './Todo/page'

export default function Home() {
  return (
    <main className="flex items-center justify-center m-10">
      <Todo />
    </main>
  );
}
