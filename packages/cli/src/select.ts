import inquirer from 'inquirer'
const select = () => {
    console.log(123123)
    inquirer.prompt({
        name: 'locale',
        type: 'confirm',
        message: 'Whether to use i18n?',
        default: false,
      }).then(res=>{
        console.log(res)
      })
}

export default select