
"use client"

import React, { useEffect } from 'react'
import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import Form from "@components/Form";

const UpdatePost = () => {
    const router = useRouter();
    
    const [submitting, setSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const postId = searchParams.get('id');
    const [post, setPost] = useState({
        content: '',
        tag: '',
    })

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/quotes/${postId}`);
            const data = await response.json();

            setPost({
                content: data.content,
                tag: data.tag,
            })
        }
        if (postId) getPostDetails();
    }, [postId])
    
    const updatePost = async (e) => {
        console.log("Updating");
        e.preventDefault();
        setSubmitting(true);

        if(!postId) return alert("Post Id not found");
        try {
            const response = await fetch(
                `/api/quotes/${postId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        content: post.content,
                        
                        tag: post.tag
                    }),
                })

                if(response.ok) {
                    router.push('/');
                }
        } catch (error) {
            console.log(error);
            
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePost}

        ></Form>
    )
}

export default UpdatePost;