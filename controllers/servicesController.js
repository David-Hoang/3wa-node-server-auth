import Service from "../models/Service.js";

export const getAllServices = async (req, res) => {
    try{
        const services = await Service.find()
        if(services.length < 1){
            return res.status(404).json(`Services not found`)
        }
        return res.status(200).json(services)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}

export const createService = async (req, res) => {
    try{
        const newService = await Service.create(req.body)
        if(newService){
            return res.status(201).json(`Your event has been created`)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}

export const showService = async (req, res) => {
    const {id} = req.params;

    try {
        const getService = await Service.findById(id);
        if(!getService) return res.status(404).json({ message: "Service not found" });
        return res.status(200).json(getService);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"});
    }
}

export const updateService = async (req, res) => {
    const {id} = req.params;

    try {
        const updateService = await Service.findByIdAndUpdate(id, req.body);
        if(!updateService) return res.status(404).json({ message: "Service not found" });
        return res.status(200).json({ message: "Service updated !" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"});
    }

}

export const deleteService = async (req, res) => {
    const {id} = req.params;

    try {
        const deleteService = await Service.findByIdAndDelete(id);
        if(!deleteService) return res.status(404).json({ message: "Service not found" });
        return res.status(200).json({ message: "Service deleted!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error"});
    }
}