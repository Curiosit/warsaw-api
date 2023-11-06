
export const GET = async (req, {params}) => {
    try {
        console.log("try fetching rewars query");
        const query = "https://api.um.warszawa.pl/api/action/datastore_search/?resource_id=64b9d66c-d134-4a87-9f24-258676e9e498&limit=5&q=" + params.q
        console.log(query);
        const promise = (await fetch(query));
        const answers = await promise.json();
        //const data = JSON.parse(answers);
        const data = JSON.parse(JSON.stringify(answers));
        console.log(data.result.records);
        return new Response(JSON.stringify(data.result.records),{ status: 200 } )
  
    } catch (error) {
        return new Response ("Nie udało się zadać pytania", {status: 500})
    }
}
export const dynamic = 'force-dynamic'
