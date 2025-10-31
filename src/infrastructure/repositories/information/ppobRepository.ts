import { pool } from "../../../config/database.js";

export class PpobRepository {

    async getAllPpob()  {
        const query = `select code as service_code, title as service_name, ppob_icon, cost as service_tarif from ppob;`;
        const result = await pool.query(query);
        return result.rows;
    }

    async getPpobByCode(service_code: string)  {
        const query = `select id, code as service_code, title as service_name, ppob_icon, cost as service_tarif from ppob where code = $1;`;
        const values = [service_code];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
}
