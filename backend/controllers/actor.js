const Actor = require('../models/actor')
const {isValidObjectId} = require("mongoose");
const {sendError, uploadImageToCloud, formatActor} = require("../utils/helper");
const cloudinary = require("../cloud/index")


class ActorController {

    async createActor(req,res,next){
        try{
            const { name, about, gender } = req.body;
            const { file } = req;

            const newActor = new Actor({ name, about, gender });

            if (file) {
                const { url, public_id } = await uploadImageToCloud(file.path);
                newActor.avatar = { url, public_id };
            }
            await newActor.save();
            res.status(201).json(formatActor(newActor))
        } catch (e) {
            next(e)
        }
    }
    async updateActor(req,res){
        const { name, about, gender } = req.body;
        const { file } = req;
        const { actorId } = req.params;

        if (!isValidObjectId(actorId)) return sendError(res, "Invalid request!");

        const actor = await Actor.findById(actorId);
        if (!actor) return sendError(res, "Invalid request, record not found!");

        const public_id = actor.avatar?.public_id;

        if (public_id && file) {
            const { result } = await cloudinary.uploader.destroy(public_id);
            if (result !== "ok") {
                return sendError(res, "Could not remove image from cloud!");
            }
        }
        if (file) {
            const { url, public_id } = await uploadImageToCloud(file.path);
            actor.avatar = { url, public_id };
        }

        actor.name = name;
        actor.about = about;
        actor.gender = gender;

        await actor.save();

        res.status(201).json({actar:formatActor(actor)});
    }
    async removeActor(req,res){
        const { actorId } = req.params;

        if (!isValidObjectId(actorId)) return sendError(res, "Invalid request!");

        const actor = await Actor.findById(actorId);
        if (!actor) return sendError(res, "Invalid request, record not found!");

        const public_id = actor.avatar?.public_id;

        // remove old image if there was one!
        if (public_id) {
            const { result } = await cloudinary.uploader.destroy(public_id);
            if (result !== "ok") {
                return sendError(res, "Could not remove image from cloud!");
            }
        }

        await Actor.findByIdAndDelete(actorId);

        res.json({ message: "Record removed successfully." });
    }
    async searchActor(req,res){
        const { name } = req.query;
        if (!name.trim()) return sendError(res, "Invalid request!");
        const result = await Actor.find({
            name: { $regex: name, $options: "i" },
        });
        const actors = result.map((actor) => formatActor(actor));
        res.json({ results: actors });
    }
    async getLatestActors(req,res){
        const result = await Actor.find().sort({ createdAt: "-1" }).limit(12);

        const actors = result.map((actor) => formatActor(actor));

        res.json(actors);
    }
    async getSingleActor(req,res){
        const { id } = req.params;

        if (!isValidObjectId(id)) return sendError(res, "Invalid request!");

        const actor = await Actor.findById(id);
        if (!actor) return sendError(res, "Invalid request, actor not found!", 404);
        res.json({actor:formatActor(actor)});
    }
    async getActors(req,res){
        const {pageNo,limit} = req.query;

        const actors = await Actor.find({})
            .sort({createdAt:-1})
            .skip(parseInt(pageNo)*parseInt(limit))
            .limit(parseInt(limit))
        const profiles = actors.map(actor => formatActor(actor))
        res.json({
            profiles
        })
    }
}

module.exports = new ActorController()
