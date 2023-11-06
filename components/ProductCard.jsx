"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ProductCard = ({ key, product, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const user = session?.user;
  /* if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } */
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  
  


  
  return (
    <div className='prompt_card' >
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          
        >
           

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
               {product.Nazwa} 
            </h3>
            <p className='font-inter text-sm text-gray-500'>
               wyrzuć do: {product.Typ}
            </p>
          </div>
        </div>

        <div className='quote_btn' >
        
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'></p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        Inne nazwy tego produktu to: {product.Synonim}
      </p>

      
    </div>
  );
};

export default ProductCard;