const Comment = require('../models/commentModel');


exports.listAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.post_id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}


exports.createAComment = async (req, res) => {
    const newComment = new Comment({
        ...req.body,
        post_id: req.params.post_id
    });
    try {
        const comment = await newComment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}


exports.getAComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.comment_id);
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}


exports.updateAComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}

exports.deleteAComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.comment_id);
        if (!comment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
        res.status(500).console.log(error);
        res.json({ message: 'Erreur serveur' });
    }
}
