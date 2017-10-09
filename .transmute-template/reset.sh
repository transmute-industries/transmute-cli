
yarn add global transmute-cli@latest

rm -rf ./dapp
transmute setup --reset
transmute setup 
transmute init .

# cd dapp 
# firebase init 
# yarn install && cd functions && yarn install && cd ..
# NO TO EVERYTHING

# firebase deploy --only functions 