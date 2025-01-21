import pool from '../model/db.js';

export const logCommand = async (req, res) => {
    const { userId, commandText, commandType, responseText } = req.body;

    if (!userId || !commandText || !commandType || !responseText) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO command_history (user_id, command_text, command_type, response_text) VALUES (?, ?, ?, ?)',
            [userId, commandText, commandType, responseText]
        );

        res.status(201).json({ message: 'Commande enregistrée avec succès.', insertId: result.insertId });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la commande :', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la commande.' });
    }
};

export const getCommandHistory = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'L\'ID de l\'utilisateur est requis.' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM command_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
            [userId]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des commandes :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique des commandes.' });
    }
};
