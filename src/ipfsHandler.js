
export async function ipfsHandlerSavePage(pageContent) {
    const r = await fetch('/api/ipfs2', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            data: pageContent,
            name: ".",
        })
    });
    return await r.json();
}
