import {BASE_URL} from './constants';

export async function ipfsHandlerSavePage(pageContent, title) {
    const r = await fetch(`${BASE_URL}/api/ipfs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            data: pageContent,
            name: title,
        })
    });
    return await r.json();
}
