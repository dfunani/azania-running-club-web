import { NextApiRequest, NextApiResponse } from "next";
import {dbConnect} from "@/services/database/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const {db} = await dbConnect()
        const movies = await db
            .collection("users")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();

        res.status(200).json(movies);
    } catch (e) {
        console.error(e);
        res.status(400).json({message: e});
    }
}