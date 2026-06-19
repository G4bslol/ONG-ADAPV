import pool from "../config/db.js";


export async function createAnimal(animal) {
    
    const { nome, cor, dataNasc, racasId, pessoaId, fotoUrl } = animal; 

    const [result] = await pool.query(
        `INSERT INTO animais (nome, cor, dataNasc, racasId, pessoaId, fotoUrl) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nome, cor, dataNasc, racasId, pessoaId, fotoUrl] // fotoUrl pode ser null
    );
    return result.insertId;
}


export async function getAnimais() {
    const [rows] = await pool.query(`
        SELECT 
            a.id,
            a.nome,
            a.cor,
            a.dataNasc,
            a.fotoUrl,
            a.pessoaId, -- Adicionado para verificar se tem tutor
            r.nome AS racaNome,
            e.nome AS especieNome
        FROM animais a
        JOIN racas r ON a.racasId = r.id
        JOIN especies e ON r.especiesId = e.id
    `);
    return rows;
}


export async function getAnimalById(id) {
    const [rows] = await pool.query(
        `
        SELECT 
            a.*, -- 'a.*' já inclui a nova coluna 'fotoUrl'
            r.nome AS racaNome,
            e.nome AS especieNome,
            p.nome AS tutorNome
        FROM animais a
        JOIN racas r ON a.racasId = r.id
        JOIN especies e ON r.especiesId = e.id
        LEFT JOIN pessoas p ON a.pessoaId = p.id 
        WHERE a.id = ? 
    `,
        [id]
    );
    return rows[0];
}


export async function updateAnimal(id, animal) {
  
    const { nome, cor, dataNasc, racasId, pessoaId, fotoUrl } = animal;

    const [result] = await pool.query(
        `UPDATE animais SET 
         nome = ?, cor = ?, dataNasc = ?, racasId = ?, pessoaId = ?, fotoUrl = ?
         WHERE id = ?`,
        [nome, cor, dataNasc, racasId, pessoaId, fotoUrl, id]
    );
    return result.affectedRows;
}


export async function deleteAnimal(id) {
    const [result] = await pool.query(
        "DELETE FROM animais WHERE id = ?",
        [id]
    );
    return result.affectedRows;
}