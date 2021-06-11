'use strict';

const express = require('express');
const request = require('request');

const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

const app = express();

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Addr));

const erc20Abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

const assetManager = new web3.eth.Contract([{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint8","name":"category","internalType":"uint8"},{"type":"bool","name":"deprecated","internalType":"bool"}],"name":"assets","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"categoryLength","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"getAssetCategory","inputs":[{"type":"uint16","name":"index_","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"getAssetDeprecated","inputs":[{"type":"uint16","name":"index_","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getAssetLength","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getAssetToken","inputs":[{"type":"uint16","name":"index_","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"getCategoryLength","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint16","name":"","internalType":"uint16"}],"name":"getIndexesByCategory","inputs":[{"type":"uint8","name":"category_","internalType":"uint8"},{"type":"uint256","name":"categoryIndex_","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getIndexesByCategoryLength","inputs":[{"type":"uint8","name":"category_","internalType":"uint8"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"resetIndexesByCategory","inputs":[{"type":"uint8","name":"category_","internalType":"uint8"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAsset","inputs":[{"type":"uint16","name":"index_","internalType":"uint16"},{"type":"address","name":"token_","internalType":"address"},{"type":"uint8","name":"category_","internalType":"uint8"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCategoryLength","inputs":[{"type":"uint8","name":"length_","internalType":"uint8"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDeprecated","inputs":[{"type":"uint16","name":"index_","internalType":"uint16"},{"type":"bool","name":"deprecated_","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]}], config.assetManagerAddress);
const buyer = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetSubscription","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetUtilization","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beforeUpdate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"currentSubscription","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"futureSubscription","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"getPremiumRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"getTotalFuturePremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"getUtilization","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"isUserCovered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"premiumForGuarantor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"premiumForSeller","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRegistry","name":"registry_","type":"address"}],"name":"setRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"subscribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"unsubscribe","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfoMap","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"weekBegin","type":"uint256"},{"internalType":"uint256","name":"weekEnd","type":"uint256"},{"internalType":"uint256","name":"weekUpdated","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weekToUpdate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}], config.buyerAddress);
const seller = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"basketRequestMap","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"categoryBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"}],"name":"changeBasket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"changeBasketReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"doPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"finishPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"week_","type":"uint256"}],"name":"getPendingBasket","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"},{"internalType":"uint16","name":"index_","type":"uint16"}],"name":"hasIndex","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"}],"name":"hasPendingPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"isAssetLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payoutIdMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"payoutInfo","outputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unitPerShare","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfPremium","type":"uint256"},{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"premiumPerShare","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"reduceDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"},{"internalType":"address","name":"toAddress_","type":"address"},{"internalType":"uint256","name":"total_","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRegistry","name":"registry_","type":"address"}],"name":"setRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"startPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"updatePremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"futureBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"userBasket","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"week","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"withdrawReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"withdrawRequestMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"}], config.sellerAddress);
const guarantor = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"doPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"finishPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"hasPendingPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"isAssetLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payoutIdMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"payoutInfo","outputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unitPerShare","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfPremium","type":"uint256"},{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"premiumPerShare","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"reduceDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"},{"internalType":"address","name":"toAddress_","type":"address"},{"internalType":"uint256","name":"total_","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRegistry","name":"registry_","type":"address"}],"name":"setRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"startPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"updatePremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"futureBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"week","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"withdrawReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"withdrawRequestMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"}], config.guarantorAddress);
const baseToken = new web3.eth.Contract(erc20Abi, config.baseTokenAddress)

const ASSETS_NAME_LIST = [
['YFI', 'Yearn'],
['BZRX', 'bZx'],
['FIS', 'StaFi'],
['UNI', 'Uniswap'],
['POND', 'Marlin'],
['EZ', 'EasyFi V2'],
['CRV', 'Curve'],
['XEND', 'Xend Finance']];

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
  'INJ': 'injective-protocol',
  'EZ': 'easyfi',
  'POND': 'marlin',
  'FIS': 'stafi',
  'XEND': 'xend-finance'
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


const waitFor = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('');
    }, duration);
  });
}


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


const getPriceRetry = async (symbol, times=4) => {
  for (let i = 0; i < times; ++i) {
    try {
      return await getPrice(symbol);
    } catch(e) {
      await waitFor(1000);
    }
  }

  throw new Error('error-2');
}


const getPremiumRate = (category, assetUtilization) => {
  let extra = 0;
  let cap = 0.8 * 1e6;  // 80%

  if (assetUtilization >= cap) {
    extra = 1000;
  } else {
    extra = 1000 * assetUtilization / cap;
  }

  // NOTE: This is a temporary change.
  return 1135 + extra;
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
      Manager.allAssets[assetIndex_].sellerBalance = (await callFunction(seller.methods.assetBalance(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].assetSubscription = (await callFunction(buyer.methods.assetSubscription(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].premiumForGuarantor = (await callFunction(buyer.methods.premiumForGuarantor(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].premiumForSeller = (await callFunction(buyer.methods.premiumForSeller(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      price = await getPriceRetry(Manager.allAssets[assetIndex_].symbol);
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

    data.reserve = (await callFunction(seller.methods.categoryBalance(category_))) / config.baseBase;
    data.apr = data.reserve ? (data.premium / data.reserve / 7 * 365).toFixed(0) : '0';
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


app.listen(config.port);


module.exports = app;
