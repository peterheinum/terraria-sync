const shell = require('shelljs')
const {
  file,
  wait,
  done,
  dateToEnGB,
  getTimestampBelowFolder,
  getTimestampCurrentFolder
} = require('./shared')

const pullCode = () => shell.exec('git pull origin master')

const pathToFile = `terraria-syncv2/${file}`

const doneWithoutSync = () => {
  console.log('Pull done without sync.')
}

const copyToBelow = () => {
  shell.cd('..')
  shell.cp(pathToFile + '.wld', '.')
  shell.cp(pathToFile + '.wld.bak', '.')
}


const pull = () => new Promise((resolve, reject) => {
  wait()
    // .then(pullCode)
    // .then(wait)
    .then(copyToBelow)
    .then(done)
    .catch(() => {
      doneWithoutSync()
      resolve()
    })
})

// require.main == module && pull()
module.exports = { pull }

const shouldSync = () => {
  const currentFolderTime = dateToEnGB(getTimestampCurrentFolder())
  const folderBelowTime = dateToEnGB(getTimestampBelowFolder())
  return folderBelowTime < currentFolderTime
}

const lessTime = dateToEnGB(Date())
setTimeout(() => {
  const moreTIme = dateToEnGB(Date())
  console.log(lessTime < moreTIme)
}, 1000)