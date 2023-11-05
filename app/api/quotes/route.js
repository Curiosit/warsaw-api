
import { connectToDB } from "@utils/database";
import Post from "@models/post";
export const GET = async (req) => {
    

    try {
        console.log("try fetching");
        await connectToDB();
        console.log("fetching");
       const posts = await Post.find({}).populate('creator');
        return new Response(JSON.stringify(posts),{ status: 200 } )
    } catch (error) {
        return new Response ("Failed to load posts", {status: 500})
    }
}

