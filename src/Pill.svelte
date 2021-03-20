<script>
    export let disabled;
    export let right;
    export let buttonClick = () => {};
</script>
<style>
    button {
        display: block;
        /* margin-left: 8px; */
        border-radius: 8px;
        padding: 0 8px;
        margin: 6px 4px 1px;
        height: 25px;
        font: inherit;
        /* border: 1px solid #444; */
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
        background: #fff;
    }
    button.right {
        justify-self: flex-end;
    }
</style>

<button class:right on:click={buttonClick} disabled={disabled}><slot /></button>