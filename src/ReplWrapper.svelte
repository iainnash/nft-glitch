<script>
  import Repl from "@sveltejs/svelte-repl";
  import { onMount } from "svelte";
  
  import MintButton from "./MintButton.svelte";
  import NewLinkIcon from './NewLinkIcon.svelte';
  import Pill from './Pill.svelte';

  import App from "./template/App.svelte.txt";
  import backend from "./template/backend.js.txt";
  import Layout from "./template/Layout.svelte.txt";
  import Media from "./template/Media.svelte.txt";


  let repl;

  function getData() {
    try {
      const savedsession = window.localStorage.getItem("NFT_REPO_SESSION");
      if (savedsession) {
        return JSON.parse(savedsession);
      }
    } catch (_) {
      console.error("cannot load session");
    }

    return {
      components: [
        { type: "svelte", source: App, name: "App" },
        { type: "svelte", source: Layout, name: "Layout" },
        { type: "svelte", source: Media, name: "Media" },
        { type: "js", source: backend, name: "backend" },
      ]
    };
  }

  const debounce = (func, delay) => {
    let inDebounce;
    return function(...args) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  function handleIPFSClick() {
    alert('IPFS')
  }

  onMount(() => {
    const debouncedUpdate = debounce(data => {
      window.localStorage.setItem("NFT_REPO_SESSION", JSON.stringify(data));
    });

    repl.$on("change", evt => {
      debouncedUpdate(evt.detail);
    });
    repl.set(getData());
  });
</script>

<style>
  .toolbar {
    display: flex;
    background: #eee;
  }
</style>

<div style="height:96%">
  <div class="toolbar">
    <Pill disabled={true} text="Edits saved locally" />
    <Pill disabled={false} text="Save on IPFS" />
    <Pill disabled={false} text="Mint on ZORA" />
  </div>
  <Repl
    bind:this={repl}
    workersUrl="/workers"
    svelteUrl="https://unpkg.com/svelte@latest"
    rollupUrl="https://unpkg.com/rollup@1/dist/rollup.browser.js"
    relaxed={true} />
</div>
<!-- 
// export function makeApp(container) {
//   const app = new Repl({
//     target: container,
//     props: {
//       workersUrl: "/workers",
//       svelteUrl: "https://unpkg.com/svelte@latest",
//       rollupUrl: `https://unpkg.com/rollup@1/dist/rollup.browser.js`,
//       relaxed: true,
//     },
//   });
  
//   // let timer;
//   // const debounceSave = (content) => {
//   //   clearTimeout(timer);
//   //   timer = setTimeout(() => {
//   //     window.localStorage.setItem('NFT_REPO_SESSION', JSON.stringify(content));
//   //   }, 1000);
//   // }
  
//   app.$on('change', (evt) => {
//     // debounceSave(evt.detail);
//   })
  
//   function getData() {
//     const savedsession = window.localStorage.getItem('NFT_REPO_SESSION');
//     if (false && savedsession) {
//       return JSON.parse(savedsession);
//     }
//     return {
//       components: [
//         {type: 'svelte', source: App, name: 'App'},
//         {type: 'js', source: backend, name: 'backend'},
//         {type: 'svelte', source: Layout, name: 'Layout'},
//         {type: 'svelte', source: Media, name: 'Media'},
//       ],
//     };
//   }
  
//   app.set(getData());
// }
 -->
