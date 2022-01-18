const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all department API endpoint
router.get('/department', (req, res) => {
    const sql = `SELECT department.*, role.title 
             AS title 
             FROM department 
             LEFT JOIN role 
             ON department.role_id = role.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.sendStatus(500).json({ error: err.message });
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

// GET a single department
router.get('/department/:id', (req, res) => {
    const sql = `SELECT department.*, role.title 
             AS title 
             FROM department 
             LEFT JOIN role
             ON department.role_id = role.id 
             WHERE department.id = ?`;
    const params = [req.params.id]; // holds value of the id

    db.query(sql, params, (err, row) => {
        if (err) {
            res.sendStatus(400).json ({ error: error.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a department
router.delete('/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a department
router.post('/department', ({ body}, res) => {
    const errors = inputCheck(body, 'name');
    if (errors) {
        res.sendStatus(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO department (name)
        VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
     if (err) {
        res.status(400).json({ error: err.message });
        return;
  }
  res.json({
    message: 'success',
    data: body
    });
  });
});

// Update a role
router.put('/department/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id'); // forces a role id to be supplied by client
  
  if (errors) {
    res.sendStatus(400).json({ error: errors });
    return;
  }
    const sql = `UPDATE department SET role_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Department not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
    

module.exports = router; 