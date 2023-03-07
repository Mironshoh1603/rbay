import { client } from "$services/redis";
import { itemsIndexKey } from "$services/keys";
import { deserialize } from "./deserialize";
export const searchItems = async (term: string, size: number = 5) => {
    const cleaned = term.replaceAll(/[^a-zA-Z0-9 ]/g, '')
        .trim()
        .split(' ')
        .map((word) => (word ? `%${word}%` : ''))
        .join(' ');

    if (cleaned === "") {
        return []
    }

    const results = await client.ft.search(
        itemsIndexKey(),
        cleaned,
        {
            LIMIT: {
                from: 0,
                size
            }
        }
    )
    // console.log(results);
    return results.documents.map(({ id, value }) => deserialize(id, value as any))

};
