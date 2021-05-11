'use strict';

const express = require('express');
const request = require('request');

const app = express();

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/YOUR_INFURA_KEY'));

const erc20Abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const assetManager = new web3.eth.Contract([{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"assets","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint8","name":"category","type":"uint8"},{"internalType":"bool","name":"deprecated","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"index_","type":"uint16"}],"name":"getAssetCategory","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"index_","type":"uint16"}],"name":"getAssetDeprecated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAssetLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"index_","type":"uint16"}],"name":"getAssetToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCategoryLength","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"categoryIndex_","type":"uint256"}],"name":"getIndexesByCategory","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"getIndexesByCategoryLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"resetIndexesByCategory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"index_","type":"uint16"},{"internalType":"address","name":"token_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"setAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}], "0x7bdc3eaeBa61293826159c2F8fA76cC79674967D");
const buyer = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"assetManager","outputs":[{"internalType":"contract IAssetManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetSubscription","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetUtilization","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beforeUpdate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonus","outputs":[{"internalType":"contract IBonus","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"currentSubscription","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"futureSubscription","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"getPremiumRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"getTotalFuturePremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"getUtilization","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guarantor","outputs":[{"internalType":"contract IGuarantor","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"guarantorPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"isUserCovered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platformPercentage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"premiumForGuarantor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"premiumForSeller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"seller","outputs":[{"internalType":"contract ISeller","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IAssetManager","name":"assetManager_","type":"address"}],"name":"setAssetManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"baseToken_","type":"address"}],"name":"setBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBonus","name":"bonus_","type":"address"}],"name":"setBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IGuarantor","name":"guarantor_","type":"address"}],"name":"setGuarantor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percentage_","type":"uint256"}],"name":"setGuarantorPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"platform_","type":"address"}],"name":"setPlatform","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"percentage_","type":"uint256"}],"name":"setPlatformPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISeller","name":"seller_","type":"address"}],"name":"setSeller","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tidalToken_","type":"address"}],"name":"setTidalToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"subscribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tidalToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"unsubscribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfoMap","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"weekBegin","type":"uint256"},{"internalType":"uint256","name":"weekEnd","type":"uint256"},{"internalType":"uint256","name":"weekUpdated","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weekToUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}], "0x0de52D48482Bf7F8A4c94bFdbdEDD2319E99e92F");
const seller = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"assetManager","outputs":[{"internalType":"contract IAssetManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"basketRequestMap","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonus","outputs":[{"internalType":"contract IBonus","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyer","outputs":[{"internalType":"contract IBuyer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"categoryBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"}],"name":"changeBasket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"changeBasketReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"doPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"finishPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"getLatestPendingBasket","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"week_","type":"uint256"}],"name":"getPendingBasket","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"},{"internalType":"uint16","name":"index_","type":"uint16"}],"name":"hasIndex","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"}],"name":"hasPendingPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"isAssetLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payoutIdMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"payoutInfo","outputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unitPerShare","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfPremium","type":"uint256"},{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"premiumPerShare","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IAssetManager","name":"assetManager_","type":"address"}],"name":"setAssetManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"baseToken_","type":"address"}],"name":"setBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBonus","name":"bonus_","type":"address"}],"name":"setBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBuyer","name":"buyer_","type":"address"}],"name":"setBuyer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"},{"internalType":"address","name":"toAddress_","type":"address"},{"internalType":"uint256","name":"total_","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tidalToken_","type":"address"}],"name":"setTidalToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"startPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tidalToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"updatePremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"futureBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"userBasket","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"week","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"withdrawReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"withdrawRequestMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"}], "0xb3b3347de2aEa46312622aD18afb11086fDD2a84");
const guarantor = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"assetManager","outputs":[{"internalType":"contract IAssetManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonus","outputs":[{"internalType":"contract IBonus","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyer","outputs":[{"internalType":"contract IBuyer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"doPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"finishPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"hasPendingPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"isAssetLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payoutIdMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"payoutInfo","outputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unitPerShare","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfPremium","type":"uint256"},{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"premiumPerShare","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"reduceDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IAssetManager","name":"assetManager_","type":"address"}],"name":"setAssetManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"baseToken_","type":"address"}],"name":"setBaseToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBonus","name":"bonus_","type":"address"}],"name":"setBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBuyer","name":"buyer_","type":"address"}],"name":"setBuyer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"},{"internalType":"address","name":"toAddress_","type":"address"},{"internalType":"uint256","name":"total_","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"tidalToken_","type":"address"}],"name":"setTidalToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"startPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tidalToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"updatePremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"futureBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"week","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"withdrawReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"withdrawRequestMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"}], "0x6d399e0E60560919d2BfaD2bE3c2bF77e10DC828");


const ASSETS_NAME_LIST = [
['UNI', 'Uniswap'],
['AAVE', 'Aave'],
['CRV', 'Curve'],
['COMP', 'Compound'],
['BAL', 'Balancer'],
['1INCH', '1Inch'],
['YFI', 'Yearn'],
['MKR', 'Maker'],
['BNT', 'Bancor'],
['BZRX', 'bZx'],
['GNO', 'Gnosis'],
['HEGIC', 'Hegic'],
['KNC', 'Kyber'],
['SNX', 'Synthetix'],
['PICKLE', 'Pickle'],
['HOPR', 'HOPR'],
['FARM', 'Harvest'],
['IDLE', 'Idle'],
['SDT', 'Stake DAO'],
['INJ', 'Injective']];

const BASE_BASE = 1e18;

const symbolToId = {
  'AAVE': 'aave',
  'CRV': 'curve-dao-token',
  'UNI': 'uniswap',
  'COMP': 'compound-governance-token',
  'BAL': 'balancer',
  'YFI': 'yearn-finance',
  'MKR': 'maker',
  'BNT': 'bancor',
  'BZRX': 'bzx-protocol',
  'GNO': 'gnosis',
  'HEGIC': 'hegic',
  'KNC': 'kyber-network',
  'SNX': 'havven',
  'PICKLE': 'pickle-finance',
  'FARM': 'harvest-finance',
  'IDLE': 'idle',
  'SDT': 'stake-dao',
  '1INCH': '1inch',
  'HOPR': 'hopr',
  'INJ': 'injective-protocol'
};


const callFunction = (func) => {
  return new Promise((resolve, reject) => {
    func.call({}, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};


const getPrice = (symbol) => {
  const id = symbolToId[symbol];
  return new Promise((resolve, reject) => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids='+ id +'&vs_currencies=usd';
    request(url, (error, response, body) => {
      if (error) {
        reject('error-0');
      } else if (response && response.statusCode == 200) {
        const data = JSON.parse(body);
        if (data[id]) {
          resolve(data[id]['usd']);
        } else {
          console.log('no price:', id);
          resolve(0);
        }
      } else {
        reject('error-1');
      }
    });
  });
}


const getPremiumRate = (category, assetUtilization) => {
  let extra = 0;
  let cap = 0.8 * 1e6;  // 80%

  if (assetUtilization >= cap) {
    extra = 1000;
  } else {
    extra = 1000 * assetUtilization / cap;
  }

  if (category == 0) {
    return 500 + extra;
  } else if (category == 1) {
    return 1135 + extra;
  } else {
    return 2173 + extra;
  }
}


const Manager = {
  allAssets: [],
  allCategories: [],
  userCurrentBasket: [],
  userFutureBasket: [],

  async loadOneAssetBasic(assetIndex_) {
    Manager.allAssets[assetIndex_] = {index: assetIndex_};
    const all = [(async() => {
      Manager.allAssets[assetIndex_].token = await callFunction(assetManager.methods.getAssetToken(assetIndex_));
    }) (), (async() => {
      Manager.allAssets[assetIndex_].category = await callFunction(assetManager.methods.getAssetCategory(assetIndex_));
    }) ()];
    await Promise.all(all);
    Manager.allAssets[assetIndex_].symbol = ASSETS_NAME_LIST[assetIndex_][0];
    Manager.allAssets[assetIndex_].name = ASSETS_NAME_LIST[assetIndex_][1];

    const token = new web3.eth.Contract(erc20Abi, Manager.allAssets[assetIndex_].token);
    Manager.allAssets[assetIndex_].decimals = await callFunction(token.methods.decimals());
  },

  async loadOneAssetExtended(assetIndex_) {
    const decimals = Manager.allAssets[assetIndex_].decimals;
    const base = 10**decimals;
    let price = 0;

    const all = [(async() => {
      Manager.allAssets[assetIndex_].guarantorBalance = (await callFunction(guarantor.methods.assetBalance(assetIndex_))) / base;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].sellerBalance = (await callFunction(seller.methods.assetBalance(assetIndex_))) / BASE_BASE;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].assetSubscription = (await callFunction(buyer.methods.assetSubscription(assetIndex_))) / BASE_BASE;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].premiumForGuarantor = (await callFunction(buyer.methods.premiumForGuarantor(assetIndex_))) / BASE_BASE;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].premiumForSeller = (await callFunction(buyer.methods.premiumForSeller(assetIndex_))) / BASE_BASE;
    }) (), (async() => {
      price = await getPrice(Manager.allAssets[assetIndex_].symbol);
    }) ()];
    await Promise.all(all);

    Manager.allAssets[assetIndex_].price = price;
    Manager.allAssets[assetIndex_].guarantorValue = Manager.allAssets[assetIndex_].guarantorBalance * price;
    Manager.allAssets[assetIndex_].assetUtilization =
        Manager.allAssets[assetIndex_].assetSubscription / Manager.allAssets[assetIndex_].sellerBalance * 1e6;
    Manager.allAssets[assetIndex_].premiumRate = getPremiumRate(
        Manager.allAssets[assetIndex_].category, Manager.allAssets[assetIndex_].assetUtilization);

    Manager.allAssets[assetIndex_].apr =
        (Manager.allAssets[assetIndex_].assetSubscription * Manager.allAssets[assetIndex_].premiumRate * 0.9) / Manager.allAssets[assetIndex_].sellerBalance / 7 * 365;
    Manager.allAssets[assetIndex_].guarantorApr =
        (Manager.allAssets[assetIndex_].assetSubscription * Manager.allAssets[assetIndex_].premiumRate * 0.05) / Manager.allAssets[assetIndex_].guarantorValue / 7 * 365;
  },

  async loadOneCategory(category_) {
    const data = {
      reserve: 0,
      premium: 0,
      apr: 0,
      payout: 0
    };

    for (let i = 0; i < Manager.allAssets.length; ++i) {
      if (Manager.allAssets[i].category == category_) {
        data.premium += Manager.allAssets[i].assetSubscription * Manager.allAssets[i].premiumRate * 0.9;
      }
    }

    data.reserve = (await callFunction(seller.methods.categoryBalance(category_))) / BASE_BASE;
    data.apr = data.reserve ? (data.premium / data.reserve / 7 * 365 * 100).toFixed(0) : '0';
    data.tokenAPR = '0';  // TODO: Get price
    Manager.allCategories[category_] = data;
  },

  async loadUserBasket(userAddress, isCurrent, willRefresh) {
    if (!willRefresh &&
        ((isCurrent && Manager.userCurrentBasket.length > 0) ||
         (!isCurrent && Manager.userFutureBasket.length > 0))) {
      return isCurrent ? Manager.userCurrentBasket : Manager.userFutureBasket;
    }

    const array = [];
    let all = [];
    for (let i = 0; i < Manager.allAssets.length; ++i) {
      all.push((async (i) => {
        let isInBasket;
        if (isCurrent) {
          isInBasket = await callFunction(seller.methods.currentBasket(userAddress, i));
        } else {
          isInBasket = await callFunction(seller.methods.futureBasket(userAddress, i));
        }

        if (isInBasket) {
          array.push(i);
        }
      })(i));
      if (all.length >= 6) {
        await Promise.all(all);
        all = [];
      }
    }

    if (all.length > 0) {
      await Promise.all(all);
    }

    if (isCurrent) {
      Manager.userCurrentBasket = array;
    } else {
      Manager.userFutureBasket = array;
    }

    return array;
  },

  async execute() {
    for (let i = 0; i < ASSETS_NAME_LIST.length; ++i) {
      await Manager.loadOneAssetBasic(i);
      await Manager.loadOneAssetExtended(i);
    }

    await Manager.loadOneCategory(0);
    await Manager.loadOneCategory(1);
    await Manager.loadOneCategory(2);
  }
};


Manager.execute();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/get_all_assets', (req, res) => {
  res.send(Manager.allAssets);
});


app.get('/get_all_categories', (req, res) => {
  res.send(Manager.allCategories);
});


app.get('/get_baskets', async (req, res) => {
  const address = req.query.address;
  const isCurrent = parseInt(req.query.is_current) || 0;
  const willRefresh = parseInt(req.query.will_refresh) || 0;

  if (!address) {
    res.status(400).send({
      message: 'missing-address'
    });
    return;
  }

  const baskets = await Manager.loadUserBasket(address, isCurrent, willRefresh);

  res.send(baskets);
});


app.listen(8080);


module.exports = app;
