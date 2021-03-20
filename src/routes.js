import Home from "./pages/Home.svelte";
import Published from "./pages/Published.svelte";
import Editor from "./pages/Editor.svelte";

const routes = [
  {
    name: "/",
    component: Home,
  },
  {
    name: "editor/:id",
    component: Editor,
  },
  {
    name: "editor/:id/fork",
    component: Editor,
  },
  { name: "view/:id", component: Published },
];

export { routes };
