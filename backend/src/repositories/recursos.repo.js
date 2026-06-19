import pool from "../config/db.js";

export async function createRecurso(recurso){
    const {tipo,nome,quantidade,valor,descricao } = recurso;
    const [result] = await pool.query(
        "INSERT INTO recursos(tipo,nome,quantidade,valor,descricao)VALUES (?, ?, ?, ?, ?)",
        [tipo,nome,quantidade,valor || 0,descricao]
    );
    return result.insertId;
}

export async function getRecursos() {
    const [rows] = await pool.query(
        "SELECT * FROM recursos"
    );
    return rows;
}

export async function getRecursoById(id) {
    const [rows] = await pool.query(
        "SELECT * FROM recursos WHERE id = ?",
        [id]
    );
    return rows[0];
}

export async function updateRecurso(id,recurso){
    const {tipo,nome,quantidade,valor,descricao} = recurso;
    const [result] = await pool.query(
        "UPDATE recursos SET tipo = ?, nome = ?, quantidade = ?, valor = ?, descricao = ? WHERE id = ?",
        [tipo,nome,quantidade,valor || 0,descricao,id]
    );
    return result.affectedRows;
}

export async function deleteRecurso(id){
    const [result] = await pool.query(
        "DELETE FROM recursos WHERE id = ?",
        [id]
    );
    return result.affectedRows;
}

// Relatório de recursos
export async function getRelatorioRecursos() {
    const [rows] = await pool.query(`
        SELECT 
            r.id,
            r.tipo,
            r.nome,
            r.quantidade,
            r.valor,
            r.descricao,
            COALESCE(SUM(di.quantidade), 0) AS totalDoacoes,
            COALESCE(SUM(di.quantidade * r.valor), 0) AS valorTotalDoacoes
        FROM recursos r
        LEFT JOIN doacoes_itens di ON r.id = di.recursoId
        LEFT JOIN doacoes d ON di.doacaoId = d.id
        GROUP BY r.id, r.tipo, r.nome, r.quantidade, r.valor, r.descricao
        ORDER BY r.tipo, r.nome
    `);
    return rows;
}
