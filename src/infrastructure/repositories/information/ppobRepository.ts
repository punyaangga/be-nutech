import { pool } from "../../../config/database.js";

export class PpobRepository {

    async getAllPpob()  {
        const query = `select code as service_code, title as service_name, ppob_icon, cost as service_tarif from ppob;`;
        const result = await pool.query(query);
        return result.rows;
    }
    
}
