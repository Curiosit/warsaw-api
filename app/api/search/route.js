export const GET = async (req) => {
    try {
        console.log("try fetching rewars query");
        const query = "https://api.um.warszawa.pl/api/action/datastore_search/?resource_id=64b9d66c-d134-4a87-9f24-258676e9e498&limit=5"
        console.log(query);
       const answers = await fetch(
        query
      ).then((response) => response.text()).then(result => JSON.parse(result).data);
        return new Response(JSON.stringify(answers),{ status: 200 } )
  
    } catch (error) {
        return new Response ("Nie udało się zadać pytania", {status: 500})
    }
}

