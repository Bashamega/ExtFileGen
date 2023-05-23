#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const readline = require('readline');

program
  .command('generate')
  .description('Generate a new file for the extension')
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Extension name: ', (name) => {
      rl.question('About: ', (about) => {
        rl.question('Author: ', (author) => {
          rl.question('Version: ', (version) => {
            rl.question('web_url: ', (web_url) => {
              rl.question('icon: ', (icon) => {
                const filePath = "manifest.json"; // Use the provided filename as the file path
                const content = `
{
    "manifest_version": 3,
    "name": "${name}",
    "version": "${version}",
    "author": "${author}",
    "description": "${about}",
                  
    "icons": {
        "128": "${icon}"
    },
    "launch": {
        "web_url": "${web_url}"
                      
    },
    "content_scripts":[
        {
            "matches": ["*"],
            "js": ["script.js"]
        }
    ]
}
`;

                fs.writeFile(filePath, content, (error) => {
                  if (error) {
                    console.error('An error occurred while generating the files:', error);
                    
                  } else {
                    
                    fs.writeFile("script.js","//Write your Java script here", (error)=>{
                        if(error){
                            console.error('An error occurred while generating the files:', error);

                        }else{
                            console.log('File generated successfully.');
                        }
                    })
                  }
                  rl.close();
                });
              });
            });
          });
        });
      });
    });
  });

program.parse(process.argv);
