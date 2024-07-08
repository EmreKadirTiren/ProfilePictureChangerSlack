const { WebClient } = require("@slack/web-api");
const axios = require("axios").default;
const images = {
  morning:
    "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg",
  afternoon:
    "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
  night:
    "https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340",
};
async function setPFP() {
  var hour = new Date().getHours() + 2;
  let image;
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  } else if (12 < hour && hour < 20) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  } else {
    image = await axios.get(images.night, {
      responseType: "arraybuffer",
    });
  }
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN,
  });
}

setPFP();
