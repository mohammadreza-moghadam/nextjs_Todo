const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/todoValidation");

router.post("/new", requiresAuth, async (req, res) => {
    try {
        const { isValid, errors } = validateToDoInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        // create a new todo
        const newToDo = new ToDo({
            user: req.user._id,
            content: req.body.content,
            complete: false,
        });

        // save the new todo
        await newToDo.save();

        return res.json(newToDo);
    } catch (err) {
        console.log(err);

        return res.status(500).send(err.message);
    }
});

router.get("/current", requiresAuth, async (req, res) => {
    try {
        const completeToDos = await ToDo.find({
            user: req.user._id,
            complete: true,
        }).sort({ completedAt: -1 });

        const incompleteToDos = await ToDo.find({
            user: req.user._id,
            complete: false,
        }).sort({ createdAt: -1 });

        return res.json({ incomplete: incompleteToDos, complete: completeToDos });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

router.put("/:toDoId/complete", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });

        if (!toDo) {
            return res.status(404).json({ error: "Could not find ToDo" });
        }

        if (toDo.complete) {
            return res.status(400).json({ error: "ToDo is already complete" });
        }

        const updatedToDo = await ToDo.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
            {
                complete: true,
                completedAt: new Date(),
            },
            {
                new: true,
            }
        );

        return res.json(updatedToDo);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

router.put("/:toDoId/incomplete", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });

        if (!toDo) {
            return res.status(404).json({ error: "Could not find ToDo" });
        }

        if (!toDo.complete) {
            return res.status(400).json({ error: "ToDo is already incomplete" });
        }

        const updatedToDo = await ToDo.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
            {
                complete: false,
                completedAt: null,
            },
            {
                new: true,
            }
        );

        return res.json(updatedToDo);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

router.put("/:toDoId", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });

        if (!toDo) {
            return res.status(404).json({ error: "Could not find ToDo" });
        }

        const { isValid, errors } = validateToDoInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const updatedToDo = await ToDo.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
            {
                content: req.body.content,
            },
            {
                new: true,
            }
        );

        return res.json(updatedToDo);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

router.delete("/:toDoId", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });

        if (!toDo) {
            return res.status(404).json({ error: "Could not find ToDo" });
        }

        await ToDo.findOneAndRemove({
            user: req.user._id,
            _id: req.params.toDoId,
        });

        return res.json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
});

module.exports = router;