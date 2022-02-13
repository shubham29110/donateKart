const axios = require('axios');
const moment = require('moment');
const list = `https://testapi.donatekart.com/api/campaign`
const campaignList = async (req, res) => {
  try {
    const result = await axios.get(list)
    result.data.sort((a, b) => b.totalAmount - a.totalAmount);
    const newObj = result.data.map((el) => {
      return {
        title: el.title,
        totalAmount: el.totalAmount,
        backersCount: el.backersCount,
        endDate: el.endDate,
      }
    })
    res.json(newObj);
  } catch (e) {
    res.send({ message: "Error in Fetching campaign list" });
  }
}

const activeCampaign = async (req, res) => {
  try {
    const result = await axios.get(list)
    let cd = new Date();
    let now = moment(cd).utc().format('YYYY-MM-DD')
    let prior = cd.setMonth(cd.getMonth() - 1);
    prior = moment(prior).utc().format('YYYY-MM-DD')
    const newObj = []

    result.data.filter((el) => {
      if (
        now >= moment(el.created).utc().format('YYYY-MM-DD')
        && moment(el.created).utc().format('YYYY-MM-DD') >= prior
        && now <= moment(el.endDate).utc().format('YYYY-MM-DD')
      ) {
        newObj.push(el)
      }
    })
    res.json(newObj);
  } catch (e) {
    console.log(e)
    res.send({ message: "Error in Fetching active campaign" });
  }
}


const closedCampaign = async (req, res) => {
  try {
    const result = await axios.get(list)
    let cd = new Date();
    let now = moment(cd).utc().format('YYYY-MM-DD')
    let prior = cd.setMonth(cd.getMonth() - 1);
    prior = moment(prior).utc().format('YYYY-MM-DD')
    const newObj = []

    result.data.filter((el) => {
      if (now > moment(el.endDate).utc().format('YYYY-MM-DD')) {
        newObj.push(el)
      }
    })
    res.json(newObj);
  } catch (e) {
    console.log(e)
    res.send({ message: "Error in Fetching closed campaign " });
  }
}
module.exports = { campaignList, activeCampaign , closedCampaign }