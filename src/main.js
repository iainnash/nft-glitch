import Root from './Root.svelte';
import './global.css';

const app = new Root({
    target: document.body,
    props: {}
});

export default app;