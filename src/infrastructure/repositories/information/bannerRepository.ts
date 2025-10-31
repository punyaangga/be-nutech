import { pool } from "../../../config/database.js";

export class BannerRepository {
    
    async getAllBanner(){
        const query = `SELECT title as banner_name, banner_image, description FROM banner;`;
        const result = await pool.query(query);
        return result.rows;
    }
    
}
