import { IncomingForm } from 'formidable';
import { join } from 'path';
import fs from 'fs/promises'; // Use fs.promises for asynchronous file operations


export const config = {
  api: {
    bodyParser: false, // Disable the built-in bodyParser
  },
};

export default async function handler(req, res) {
  // Create an instance of IncomingForm
  const form = new IncomingForm();

  // Parse the incoming form data
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Access form fields and files
    // console.log('Form Fields:',fields);
    // console.log('Files:', files);

    // Handle the form data as needed
    const imagePath = []
    const publicDirectory = join(process.cwd(), 'public/images');

    // console.log(files['productImages'][2].originalFilename)
    // Save each file to the public directory
    for (let key = 0; key < files['productImages'].length; key++) {
      const file = files['productImages'][key];
      // console.log(file.filepath)

      // Ensure a valid file name and path
      const fileName = `file_${Date.now()}` + file.originalFilename;
      imagePath.push(fileName)
      const filePath = join(publicDirectory, fileName);

      try {
        if (file.filepath) {
          // Use fs.promises for asynchronous file operations
          await fs.copyFile(file.filepath, filePath);
          // console.log(`File saved to: ${filePath}`);
        } else {
          console.error('File path is undefined.');
          res.status(500).json({ error: 'Error saving files' });
          return;
        }
      } catch (error) {
        console.error('Error writing file:', error);
        res.status(500).json({ error: 'Error saving files' });
        return;
      }
    }


  //   //make an api call to add product
  const data = await fetch('http://localhost:3000/api/addProducts', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify([
      {
        slug: fields.slug[0],
        title: fields.name[0],
        seller: fields.seller[0],
        desc: fields.description[0],
        images: imagePath,
        category: fields.category[0],
        subCategory: fields.scategory[0],
        age: fields.age[0],
        color: fields.color[0],
        quantity: parseInt(fields.quantity[0]),
        size: fields.size[0],
        price: parseInt(fields.price[0]),
      },
    ]),
  });
  
    const resData = await data.json()
    if(resData.success) res.status(200).json({ message: true });
    res.status(500).json({ error: 'Failed' });
  //   // Send a response
  res.status(200).json({ message: true });  
  });
}
