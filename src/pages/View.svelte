<script>
    import PreviewPage from '../PreviewPage.svelte';
    export let currentRoute;
</script>

<PreviewPage cid={currentRoute.namedParams.cid} />