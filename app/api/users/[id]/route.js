
import { connectToDB } from "@utils/database";

import User from "@models/user";
export const GET = async (req, { params }) => {
    

    try {
        await connectToDB();
        
       const user = await User.find({_id: params.id}).select('username');
       console.log(user);
       console.log(JSON.stringify(user));
        return new Response(JSON.stringify(user),{ status: 200 } )
    } catch (error) {
        return new Response ("Failed to load user", {status: 500})
    }
}

