import pool from "../config/db.js";


export async function createVeterinario(veterinario) {
    const { pessoaId, CRMV } = veterinario;

    const [result] = await pool.query(
        "INSERT INTO veterinarios (pessoaId, CRMV) VALUES (?, ?)",
        [pessoaId, CRMV]
    );
    return result.insertId;
}


export async function getVeterinarios() {
    const [rows] = await pool.query(`
        SELECT 
            v.id, 
            v.CRMV, 
            v.pessoaId, 
            p.nome, 
            p.email, 
            p.telefone 
        FROM veterinarios v
        JOIN pessoas p ON v.pessoaId = p.id
    `);
    return rows;
}


export async function getVeterinarioById(id) {
    const [rows] = await pool.query(
        `
        SELECT 
            v.id, 
            v.CRMV, 
            v.pessoaId, 
            p.nome, 
            p.email, 
            p.telefone 
        FROM veterinarios v
        JOIN pessoas p ON v.pessoaId = p.id
    `,
        [id]
    );
    return rows[0];
}


export async function getVeterinarioByPessoaId(pessoaId) {
    const [rows] = await pool.query(
        `
        SELECT 
            v.id, v.CRMV, v.pessoaId, p.nome 
        FROM veterinarios v
        JOIN pessoas p ON v.pessoaId = p.id
        WHERE v.pessoaId = ?
    `,
        [pessoaId]
    );
    return rows[0];
}


export async function updateVeterinario(id, CRMV) {
    const [result] = await pool.query(
        "UPDATE veterinarios SET CRMV = ? WHERE id = ?",
        [CRMV, id]
    );
    return result.affectedRows;
}


export async function deleteVeterinario(id) {
    const [result] = await pool.query(
        "DELETE FROM veterinarios WHERE id = ?",
        [id]
    );
    return result.affectedRows;
}