const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')
//index, show, store, update, destroy

module.exports = {
	async index(req, res){
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });
    if (!dev){
    	const response = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = response.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
			const dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location
			});
      return res.json(dev);
    }
    return res.json({message: "Dev already registered."});
  },

  async update(req, res){
    const { github_username } = req.params;
    let devData = await Dev.findOne({ github_username });
    if(devData){
      let { 
        techs, 
        latitude = devData.location.coordinates[1], 
        longitude = devData.location.coordinates[0],
        name = devData.name,
        avatar_url = devData.avatar_url,
        bio = devData.bio
      } = req.body;
      techs == undefined ? techs = devData.techs:techs = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      const dev = await Dev.updateOne({github_username: github_username}, {
				name,
				avatar_url,
				bio,
        techs,
        location
			});

      return res.json(dev);
    }

    return res.json({message: "No Dev founded."});
  },

  async destroy(req,  res){
    const { github_username } = req.params;
    const findDev =  await Dev.findOne({  github_username });
    if (findDev){
      const dev = await Dev.deleteOne({github_username: github_username});
      return dev.deletedCount == 1 ? res.json({message: "Dev deleted."}):res.json({message: "No Dev deleted."})
    }

    return res.json({message: "No Dev founded."});
  }



};