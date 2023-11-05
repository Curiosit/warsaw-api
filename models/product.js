import {Schema, model, models }  from "mongoose";

const ProductSchema = new Schema ( {
    
    Nazwa: {
        type: String,
        required: [true, 'Nazwa is required.'],
    },
    Synonim: {
        type: String,
        required: [true, 'Synonim is required.'],
    },
    Typ: {
        type: String,
        required: [true, 'Typ is required.'],
    }
})

const Product = models.Product || model('Product', ProductSchema);
export default Product;