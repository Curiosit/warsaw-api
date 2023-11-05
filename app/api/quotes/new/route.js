
import { connectToDB } from "@utils/database";
import Post from "@models/post";
export const POST = async (req) => {
    console.log(req);
    const { userId, content, tag } = await req.json();
    console.log("await");
    try {
        console.log("try");
        console.log(userId);
        await connectToDB();
        const newPost = new Post({
            creator: userId,
            content,
            tag,

        })
        console.log(newPost);
        await newPost.save();
        return new Response(JSON.stringify(newPost),{ status: 201 } )
    } catch (error) {
        return new Response ("Failed to create a new post", {status: 500})
    }
}

