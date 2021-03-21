<script>
    import PreviewPage from '../PreviewPage.svelte';
    export let currentRoute;
</script>

<PreviewPage buy={false} cid={currentRoute.namedParams.cid} />