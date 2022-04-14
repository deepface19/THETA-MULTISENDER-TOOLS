# THIS THETA MULTISENDER TOOLS FOR HACKATHON THETA 

### DEMO VIDEO :
### BETA VERSION : https://theta-multisender-tools.web.app/


## FEATURES THETA MULTISENDER TOOLS
#### Transfer to multiple addresses with low fees
#### Transfer TFUEL to multiple addresses
#### Transfer TNT-20 to multiple addresses
#### Transfer TNT-721 to multiple addresses
#### Transfer TNT-1155 to multiple addresses


# HOW TO USE THETA-MULTISENDER-TOOLS
## MAX 200 ADDRESS PER TRANSACTION
 
 ### TFUEL MULTISENDER : 
 - SUBMIT RECEPIENT ADDRESS WITH AMOUNT LIKE THIS : 
 ``` 
 example
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,0.007
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,1
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,1.5
 0xdfwefnwebf8bqewefniuebfewufguyvefube,10
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,100
 0xdfwefnwebf8bqewefniuebfewufguyvefube,15000
```
### TNT-20 MULTISENDER : 
- SUBMIT TOKEN ADDRESS
- SUBMIT RECEPIENT ADDRESS WITH AMOUNT LIKE THIS : 
 ``` 
 example
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,0.007
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,1
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,1.5
 0xdfwefnwebf8bqewefniuebfewufguyvefube,10
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,100
 0xdfwefnwebf8bqewefniuebfewufguyvefube,15000
```

### TNT-721 MULTISENDER
- SUBMIT TOKEN/NFT ADDRESS
- SUBMIT RECEPIENT ADDRESS WITH TOKEN ID LIKE THIS : 
 ``` 
 example
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,51310
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,82311
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,10020
 0xdfwefnwebf8bqewefniuebfewufguyvefube,10231
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,10013
 0xdfwefnwebf8bqewefniuebfewufguyvefube,15000
```

### TNT-1155 MULTISENDER
- SUBMIT TOKEN/NFT ADDRESS
- SUBMIT RECEPIENT ADDRESS WITH TOKEN ID AND AMOUNT LIKE THIS : 
 ``` 
 example
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,51310,1
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,82311,5
 0x1238124ygvwa7fgwbdca76dsfvwabev2f7ev,10020,7
 0xdfwefnwebf8bqewefniuebfewufguyvefube,10231,10
 0x5iqefywevbfwevfw8uefb8bwfevqbyefbwye,10013,100
 0xdfwefnwebf8bqewefniuebfewufguyvefube,15000,1000
```

## AVAILABLE ON NETWORK 
### TESTNET ✅
### MAINNET ✅

## SETUP & INSTALL DEPENDENCIES
```
git clone https://github.com/deepface19/THETA-MULTISENDER-TOOLS.git
npm install
```
RUN Localhost & RUN Productions Build

```
npm start 
npm run build
```

## SETUP CONTRACT WITH HARDHAT
```
cd hardhat 
yarn deploy:testnet // yarn deploy:mainnet
# setup your smart contract or change network in hardhat.config.ts
```
