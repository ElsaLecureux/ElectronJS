const { parseFile } = require('music-metadata');
const { inspect } = require('util');

//./music/KillingInTheName.mp3

const loadMusic = async () => {
  try {
    console.log('inside loadMusic');
    const metadata = await parseFile('./musics/KillingInTheName.mp3');
    console.log(inspect(metadata, { showHidden: false, depth: null }));
  } catch (error) {
    console.error(error.message);
  }
}


console.log('hello from the renderer');