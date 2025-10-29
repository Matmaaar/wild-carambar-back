const express = require("express");
const { Sequelize } = require("sequelize");
const Blague = require("../models/Blague");
const router = express.Router();

/**
 * @swagger
 * /blagues:
 *   get:
 *     summary: Retourne toutes les blagues
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 */

router.get("/", async (_req, res) => {
  try {
    const blagues = await Blague.findAll();
    res.json(blagues);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @swagger
 * /blagues:
 *   post:
 *     summary: Ajoute une nouvelle blague
 *     tags: [Blagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               reponse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *       400:
 *         description: Données invalides
 */

router.post("/", async (req, res) => {
  try {
    const { question, reponse } = req.body;
    if (!question || !reponse) {
      return res
        .status(400)
        .json({ message: "question et reponse sont requis" });
    }
    const blague = await Blague.create({ question, reponse });
    res.status(201).json(blague);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @swagger
 * /blagues/random:
 *   get:
 *     summary: Retourne une blague aléatoire
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Blague trouvée avec succès
 *       404:
 *         description: Aucune blague trouvée
 */

router.get("/random", async (_req, res) => {
  try {
    const blague = await Blague.findOne({
      order: Sequelize.literal("RANDOM()"),
    });
    if (!blague)
      return res.status(404).json({ message: "Aucune blague trouvée" });
    res.json(blague);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @swagger
 * /blagues/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la blague à récupérer
 *     responses:
 *       200:
 *         description: Blague trouvée
 *       404:
 *         description: Blague non trouvée
 */

router.get("/:id", async (req, res) => {
  try {
    const blague = await Blague.findByPk(req.params.id);
    if (!blague) return res.status(404).json({ message: "Blague non trouvée" });
    res.json(blague);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
