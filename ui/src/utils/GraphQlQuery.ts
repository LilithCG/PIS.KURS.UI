export async function query(query: string, extractKeysLevel = 1) {
    const response = await fetch("http://localhost:5000/graphql", {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
    });

    let res = await response.json();
    for (let i = 1; i <= extractKeysLevel; i++) {
        const keys = Object.keys(res).filter(key => key !== '__typename');
        if (keys.length > 1) {
            throw new Error(`Multiple key in query answer at level ${i}`);
        }
        if (keys.length === 0) {
            throw new Error(`No keys in query answer at level ${i}`);
        }
        res = res[keys[0]];
    }
    return res;
}