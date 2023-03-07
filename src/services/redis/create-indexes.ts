import { itemsIndexKey, itemsKey } from "$services/keys";
import { client } from "./client";
import { SchemaFieldTypes } from "redis";
export const createIndexes = async () => {
    const indexes = await client.ft._list()
    const exist = indexes.find((index)=>index===itemsIndexKey())
    if(exist){
        return;
    }
    return client.ft.create(itemsIndexKey(),{
        
        name:{
            type:SchemaFieldTypes.TEXT
        },
        description:{
            type:SchemaFieldTypes.TEXT
        }
    },{
        ON:'HASH',
        PREFIX:itemsKey("")
    })
};
