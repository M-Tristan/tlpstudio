/* eslint-disable @typescript-eslint/no-var-requires */
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
const createFile =(componentPath:string,fileName:string,componentname:string) => {
  if(fs.pathExistsSync( path.resolve(process.cwd(),componentPath,componentname+'/'+fileName))){
    return
  }
  const filepath = path.resolve(__dirname,'../template/node/'+fileName+'.temp')
  let res:string =  fs.readFileSync(filepath,{encoding:'utf-8'})
  res = res.replaceAll("{{:name}}",componentname)
  fs.writeFileSync(path.resolve(process.cwd(),componentPath,componentname+'/'+fileName),res)
}
const createNode = () => {
    inquirer.prompt({
        name: 'componentname',
        type: 'input',
        message: '输入组建名?',
        default: "testNode"+Date.now(),
      }).then((res: any)=>{
        const config = require(path.resolve(process.cwd(),'./cilconfig.json'))
        const componentname = res.componentname
       
        if(!fs.pathExistsSync( path.resolve(process.cwd(),config.componentPath,componentname))){
         fs.mkdirsSync(path.resolve(process.cwd(),config.componentPath,componentname))
        }
        createFile(config.componentPath,'config.ts',componentname)
        createFile(config.componentPath,'edit.vue',componentname)
        createFile(config.componentPath,'index.ts',componentname)
        createFile(config.componentPath,'index.vue',componentname)
       
       
      })
}
export {createNode}
export default {createNode}