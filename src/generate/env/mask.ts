const fs = require('fs');

export default (prefix, dotEnvPath, outputConfigPath, callback) => {

    fs.readFile(dotEnvPath, 'utf8', (err, envFile) => {
        if (err){
            throw err
        }
        let lines = envFile.split('\n')
        let result = '';
        lines.forEach((line) => {
            let [key, value] = line.split('=')
            result += `${key}='EXAMPLE' \n`
        })
        fs.writeFile(outputConfigPath, result, (err) => {
            if (err) return console.log(err);
            callback();
        });
    });

}