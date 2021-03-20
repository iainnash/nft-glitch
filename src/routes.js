import Home from "./pages/Home.svelte";
import Published from "./pages/Published.svelte";
import View from "./pages/View.svelte";
import Editor from "./pages/Editor.svelte";

const routes = [
  {
    name: "/",
    component: Home,
  },
  {
    name: "editor/:cid/fork",
    component: Editor,
  },
  { name: "published/:cid", component: Published },
  { name: "v/:cid", component: View },
];

export { routes };
