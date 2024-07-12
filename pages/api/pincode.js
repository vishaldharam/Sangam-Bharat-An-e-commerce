export default function handler(req, res) {
    let pinData = {
      "22231":['Mumbai','Maharashtra'],
      "423109":['Shirdi','Maharashtra'],
      '423603':['Kopargaon','Maharashtra'],
      '233232':['Ahemednagar','Maharashtra']
    } 
    res.status(200).json({pinData:pinData})
  }