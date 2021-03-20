<script>
    export let disabled;
</script>
<style>
    span {
        display: block;
        margin-left: 8px;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
        background: #fff;
    }
    span::before {
        content: 'x';
        position: relative;
        width: 2px;
        height: 2px;
        border-radius: 4px;;
        background: lightgreen;
        color: lightgreen;
        font-size: 1.2em;
    }
</style>

<button disabled={disabled}><slot /></button>