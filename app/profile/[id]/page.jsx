"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Profile from "@components/Profile";


const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    //const userName = searchParams.get("name");
    const router = useRouter();
    const [userPosts, setUserPosts] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const responseuser = await fetch(`/api/users/${params?.id}`);
            
            const datauser = await responseuser.json();
            
            if (!datauser) {
                router.push("/");
            }
            const response = await fetch(`/api/users/${params?.id}/posts`);
            setUserName(datauser[0].username);
            const data = await response.json();


            setUserPosts(data);
        };
        console.log("start");
        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized quotr page. Explore ${userName}'s exceptional quotes!`}
            data={userPosts}
        />
    );
};

export default UserProfile;