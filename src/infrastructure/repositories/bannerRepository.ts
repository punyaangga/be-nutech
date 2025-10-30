import { title } from "process";
import { pool } from "../../config/database.js";
import type { Banner } from "../../domain/entities/bannerEntity.js";

export class BannerRepository {
    async getAllBanner(){
    const query = `SELECT title, banner_image, description FROM banner;`;
    const result = await pool.query(query);
    return result.rows[0] || null;
    }
}
