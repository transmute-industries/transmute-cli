const fs = require('fs');

module.exports = (dotenv_path, callback) => {

    fs.readFile(dotenv_path, 'utf8', (err, envFile) => {
        let lines = envFile.split('\n')
        let result = '';
        lines.forEach((line) => {
            let [key, value] = line.split('=')
            result += `${key}='EXAMPLE' \n`
        })
        fs.writeFile('example.env', result, (err) => {
            if (err) return console.log(err);
            callback();
        });
    });

}