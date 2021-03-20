<script>
  import Repl from "@sveltejs/svelte-repl";
  import { onMount } from "svelte";
  import { navigateTo } from "svelte-router-spa";

  import {SEPERATOR_STRING} from './constants';
  import { ipfsHandlerSavePage } from "./ipfsHandler";
  import Pill from "./Pill.svelte";

  import App from "./template/App.svelte.txt";
  import backend from "./template/backend.js.txt";
  import Layout from "./template/Layout.svelte.txt";
  import Media from "./template/Media.svelte.txt";
  import GeneratedPage from './template/GeneratedPage.html.txt';

  let repl;
  export let dataContents;
  let pageScript;

  function getData() {
    try {
      const savedsession = window.localStorage.getItem(`NFT_REPO_SESSION${dataContents ? dataContents.cid : 'example'}`);
      if (savedsession && savedsession.length) {
        return JSON.parse(savedsession);
      }
      if (dataContents) {
        return dataContents.data;
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
      ],
    };
  }

  const debounce = (func, delay) => {
    let inDebounce;
    return function (...args) {
      const context = this;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  function mintZora() {
    alert('Please save to IPFS first');
  }

  function resetEdits() {
    if (!confirm('Are you sure you wish to reset this editor to the template?')) {
      return
    }
    window.localStorage.removeItem(`NFT_REPO_SESSION${dataContents ? dataContents.cid : 'example'}`);
    repl.set(getData());
  }

  async function handleIPFSClick() {
    const previewPage = document.querySelector('iframe[title="Result"]').contentDocument;
    const toSave = GeneratedPage
      .replace('{JSONEND}', SEPERATOR_STRING+JSON.stringify(window.currentEditor))
      .replace('{CONTENT}', previewPage.body.innerHTML)
      .replace('{SCRIPT}', pageScript)
      .replace('{PAGE_TITLE}', prompt("Name your masterpiece!"))
      .replace('{STYLES}', previewPage.getElementsByTagName('style')[0].innerHTML)
    console.log('saving page', toSave);
    const { cid } = await ipfsHandlerSavePage(toSave);
    navigateTo(`/v/${cid}`);
  }

  onMount(() => {
    const debouncedUpdate = debounce((data) => {
      window.localStorage.setItem("NFT_REPO_SESSION", JSON.stringify(data));
    });

    repl.$on("change", (evt) => {
      window.currentEditor = evt.detail;
      debouncedUpdate(evt.detail);
    });
    const windowData = getData();
    window.currentEditor = windowData;
    repl.set(windowData);

    document.querySelector('iframe[title="Result"]').contentWindow.addEventListener('message', (event) => {
      if (event.data.action === 'eval') {
        pageScript = event.data.args.script;
      }
    })
    
  });
</script>

<div style="height:100%">
  <div class="toolbar">
    <Pill disabled={true}>Edits saved locally</Pill>
    <Pill buttonClick={resetEdits}>Reset edits</Pill>
    <Pill buttonClick={handleIPFSClick} disabled={false}>Save on IPFS</Pill>
    <Pill disabled={false} buttonClick={mintZora}>Mint on ZORA</Pill>
    <div style="flex: 1" />
    <Pill buttonClick={() => navigateTo('/')} disabled={false}>WHAT IS THIS!</Pill>
  </div>
  <Repl
    bind:this={repl}
    workersUrl="/workers"
    svelteUrl="https://unpkg.com/svelte@latest"
    rollupUrl="https://unpkg.com/rollup@1/dist/rollup.browser.js"
    relaxed={true}
  />
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

<style>
  .toolbar {
    display: flex;
    background: #eee;
    height: 40px;
  }
</style>
