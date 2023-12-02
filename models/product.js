import {Schema, model, models }  from "mongoose";

const ProductSchema = new Schema ( {
    
    Nazwa: {
        type: String,
        required: [true, 'Nazwa is required.'],
    },
    Synonim: {
        type: String,
        
    },
    Typ: {
        type: String,
        required: [true, 'Typ is required.'],
    },
    Tak: {
        type: String,
        
    }
})

const Product = models.Product || model('Product', ProductSchema);
export default Product;