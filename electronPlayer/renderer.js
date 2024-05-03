const { parseFile } = require('music-metadata');
const { inspect } = require('util');
const $ = require('jquery')

let files;

function chooseMusic(){
  $('input').click()
}

const loadMusic = async () => {
  try {
    files = $('input').get(0).files;
    console.log(files);
    // files.map( async (file) => {
    //     // a revoir
    //     path = file.path
    //     const metadata = await parseFile(path);
    //     file = {
    //         path: file.path,
    //         title: metadata.common.title,
    //         artist: metadata.common.albumartist,
    //         //durée: metadata.,
    //     }
    //     console.log(file);
    //     return file;
    // })
    // create files array with inportant informations 
    
    // create tr inside table for each file:
  } catch (error) {
    console.error(error.message);
  }
}
