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
const buyer = new web3.eth.Contract([{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"assetUtilization","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"beforeUpdate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint16","name":"","internalType":"uint16"}],"name":"buyerAssetIndexPlusOne","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"currentSubscription","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount_","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"extra","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"futureSubscription","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getBalance","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint16","name":"","internalType":"uint16"}],"name":"getBuyerAssetIndex","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentWeek","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getNow","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPremiumRate","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUnlockTime","inputs":[{"type":"uint256","name":"time_","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUnlockWeek","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"hasBuyerAssetIndex","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isUserCovered","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"premiumForGuarantor","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"premiumForSeller","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"premiumToRefund","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IRegistry"}],"name":"registry","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBuyerAssetIndex","inputs":[{"type":"address","name":"who_","internalType":"address"},{"type":"uint16","name":"assetIndex_","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExtra","inputs":[{"type":"uint256","name":"extra_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOffset","inputs":[{"type":"uint256","name":"offset_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRegistry","inputs":[{"type":"address","name":"registry_","internalType":"contract IRegistry"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"subscribe","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"},{"type":"uint256","name":"amount_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unsubscribe","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"},{"type":"uint256","name":"amount_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"update","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"balance","internalType":"uint256"},{"type":"uint256","name":"weekBegin","internalType":"uint256"},{"type":"uint256","name":"weekEnd","internalType":"uint256"},{"type":"uint256","name":"weekUpdated","internalType":"uint256"}],"name":"userInfoMap","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"weekToUpdate","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount_","internalType":"uint256"}]}], config.buyerAddress);
const seller = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"basketRequestMap","outputs":[{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"categoryBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"}],"name":"changeBasket","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"changeBasketReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"doPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"finishPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"week_","type":"uint256"}],"name":"getPendingBasket","outputs":[{"internalType":"uint16[]","name":"","type":"uint16[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"},{"internalType":"uint16","name":"index_","type":"uint16"}],"name":"hasIndex","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint16[]","name":"basketIndexes_","type":"uint16[]"}],"name":"hasPendingPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"isAssetLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payoutIdMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"payoutInfo","outputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unitPerShare","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfPremium","type":"uint256"},{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"premiumPerShare","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"reduceDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"},{"internalType":"address","name":"toAddress_","type":"address"},{"internalType":"uint256","name":"total_","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRegistry","name":"registry_","type":"address"}],"name":"setRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"startPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"updatePremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"futureBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"userBasket","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"week","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"category_","type":"uint8"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint8","name":"category_","type":"uint8"}],"name":"withdrawReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint8","name":"","type":"uint8"}],"name":"withdrawRequestMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"}], config.sellerAddress);
const guarantor = new web3.eth.Contract([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"assetBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimPremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"doPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"extra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"finishPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time_","type":"uint256"}],"name":"getUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUnlockWeek","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"hasPendingPayout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"isAssetLocked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"payoutIdMap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"payoutInfo","outputs":[{"internalType":"address","name":"toAddress","type":"address"},{"internalType":"uint256","name":"total","type":"uint256"},{"internalType":"uint256","name":"unitPerShare","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"bool","name":"finished","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"","type":"uint16"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"weekOfPremium","type":"uint256"},{"internalType":"uint256","name":"weekOfBonus","type":"uint256"},{"internalType":"uint256","name":"premiumPerShare","type":"uint256"},{"internalType":"uint256","name":"bonusPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"reduceDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"extra_","type":"uint256"}],"name":"setExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset_","type":"uint256"}],"name":"setOffset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"},{"internalType":"address","name":"toAddress_","type":"address"},{"internalType":"uint256","name":"total_","type":"uint256"}],"name":"setPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IRegistry","name":"registry_","type":"address"}],"name":"setRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"payoutId_","type":"uint256"}],"name":"startPayout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"}],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"updateBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"updatePremium","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"currentBalance","type":"uint256"},{"internalType":"uint256","name":"futureBalance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"week","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"uint256","name":"bonus","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"assetIndex_","type":"uint16"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who_","type":"address"},{"internalType":"uint16","name":"assetIndex_","type":"uint16"}],"name":"withdrawReady","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint16","name":"","type":"uint16"}],"name":"withdrawRequestMap","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"bool","name":"executed","type":"bool"}],"stateMutability":"view","type":"function"}], config.guarantorAddress);
const bonus = new web3.eth.Contract([{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusPerAssetOfG","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusPerAssetOfS","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"extra","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentWeek","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getNow","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUnlockTime","inputs":[{"type":"uint256","name":"time_","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUnlockWeek","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"guarantorWeek","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"offset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IRegistry"}],"name":"registry","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"sellerWeek","inputs":[{"type":"uint16","name":"","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBonusPerAssetOfG","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"},{"type":"uint256","name":"value_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBonusPerAssetOfS","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"},{"type":"uint256","name":"value_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setExtra","inputs":[{"type":"uint256","name":"extra_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOffset","inputs":[{"type":"uint256","name":"offset_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRegistry","inputs":[{"type":"address","name":"registry_","internalType":"contract IRegistry"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateGuarantorBonus","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateSellerBonus","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"}]}], config.bonusAddress);
const committee = new web3.eth.Contract([{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addMember","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"commiteeVoteThreshod","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"confirmPayoutAmountRequest","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"},{"type":"uint256","name":"payoutId_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"confirmPayoutStartRequest","inputs":[{"type":"uint256","name":"requestIndex_","internalType":"uint256"},{"type":"uint256","name":"payoutId_","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"feeToRequestPayout","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isMember","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isPayoutStartRequestExpired","inputs":[{"type":"uint256","name":"requestIndex_","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maximumRequestDuration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"memberIndexPlusOne","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"members","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"toAddress","internalType":"address"},{"type":"uint256","name":"sellerAmount","internalType":"uint256"},{"type":"uint256","name":"guarantorAmount","internalType":"uint256"},{"type":"uint256","name":"stakingAmount","internalType":"uint256"},{"type":"bool","name":"executed","internalType":"bool"},{"type":"uint256","name":"voteCount","internalType":"uint256"}],"name":"payoutAmountRequestMap","inputs":[{"type":"uint16","name":"","internalType":"uint16"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"time","internalType":"uint256"},{"type":"uint16","name":"assetIndex","internalType":"uint16"},{"type":"address","name":"requester","internalType":"address"},{"type":"bool","name":"executed","internalType":"bool"},{"type":"uint256","name":"voteCount","internalType":"uint256"}],"name":"payoutStartRequests","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IRegistry"}],"name":"registry","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeMember","inputs":[{"type":"address","name":"who_","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"requestPayoutAmount","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"},{"type":"uint256","name":"payoutId_","internalType":"uint256"},{"type":"address","name":"toAddress_","internalType":"address"},{"type":"uint256","name":"sellerAmount_","internalType":"uint256"},{"type":"uint256","name":"guarantorAmount_","internalType":"uint256"},{"type":"uint256","name":"stakingAmount_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"requestPayoutStart","inputs":[{"type":"uint16","name":"assetIndex_","internalType":"uint16"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCommiteeVoteThreshod","inputs":[{"type":"uint256","name":"threshold_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeToRequestPayout","inputs":[{"type":"uint256","name":"fee_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMaximumRequestDuration","inputs":[{"type":"uint256","name":"duration_","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRegistry","inputs":[{"type":"address","name":"registry_","internalType":"contract IRegistry"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]}], config.committeeAddress);

const baseToken = new web3.eth.Contract(erc20Abi, config.baseTokenAddress)

const ASSETS_NAME_LIST = [
['FIS', 'StaFi'],
['IF', 'Impossible Finance'],
['POND', 'Marlin'],
['BZRX', 'bZx'],
['XEND', 'Xend Finance'],
['EZ', 'EasyFi'],
['YFI', 'Yearn']];

const symbolToId = {
  'AAVE': 'aave',
  'CRV': 'curve-dao-token',
  'UNI': 'uniswap',
  'COMP': 'compound-governance-token',
  'BAL': 'balancer',
  'YFI': 'yearn-finance',
  'IF': 'impossible-finance',
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
  'XEND': 'xend-finance',
  'TIDAL': 'tidal-finance'
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


const getPremiumRate = (assetIndex) => {
  return 961;
}


const Manager = {
  allAssets: [],
  allCategories: [],
  userBasket: [],
  payoutRequests: [],

  async loadOnePayoutRequest(requestIndex_) {
    const data = await callFunction(committee.methods.payoutStartRequests(requestIndex_));
    Manager.payoutRequests.unshift({
      index: requestIndex_,
      time: data.time,
      assetIndex: data.assetIndex,
      assetName: ASSETS_NAME_LIST[data.assetIndex][1],
      requester: data.requester,
      executed: data.executed,
      voteCount: data.voteCount
    });
  },

  async loadMorePayoutRequests() {
    let index = Manager.payoutRequests.length;
    while(1) {
      try {
        await Manager.loadOnePayoutRequest(index);
        ++index;
      } catch(e) {
        console.log('payout index break', index)
        break;
      }
    }
  },

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

    if (Manager.allAssets[assetIndex_].token != 0 &&
        Manager.allAssets[assetIndex_].token != '0' &&
        Manager.allAssets[assetIndex_].token != '0x0' &&
        Manager.allAssets[assetIndex_].token != '0x0000000000000000000000000000000000000000') {
      const token = new web3.eth.Contract(erc20Abi, Manager.allAssets[assetIndex_].token);
      Manager.allAssets[assetIndex_].decimals = await callFunction(token.methods.decimals());
    } else {
      Manager.allAssets[assetIndex_].decimals = 18;
    }
  },

  async loadOneAssetExtended(assetIndex_) {
    const decimals = Manager.allAssets[assetIndex_].decimals;
    const base = 10**decimals;
    let price = 0;
    let tidalPrice = 0;
    let bonusOfS = 0;
    let bonusOfG = 0;

    const all = [(async() => {
      Manager.allAssets[assetIndex_].guarantorBalance = (await callFunction(guarantor.methods.assetBalance(assetIndex_))) / base;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].sellerBalance = (await callFunction(seller.methods.assetBalance(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].currentSubscription = (await callFunction(buyer.methods.currentSubscription(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].premiumForGuarantor = (await callFunction(buyer.methods.premiumForGuarantor(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      Manager.allAssets[assetIndex_].premiumForSeller = (await callFunction(buyer.methods.premiumForSeller(assetIndex_))) / config.baseBase;
    }) (), (async() => {
      price = await getPriceRetry(Manager.allAssets[assetIndex_].symbol);
    }) (), (async() => {
      tidalPrice = await getPriceRetry('TIDAL');
    }) (), (async() => {
      bonusOfS = (await callFunction(bonus.methods.bonusPerAssetOfS(assetIndex_))) / config.tidalBase;
    }) (), (async() => {
      bonusOfG = (await callFunction(bonus.methods.bonusPerAssetOfG(assetIndex_))) / config.tidalBase;
    }) ()];
    await Promise.all(all);

    Manager.allAssets[assetIndex_].price = price;
    Manager.allAssets[assetIndex_].guarantorValue = Manager.allAssets[assetIndex_].guarantorBalance * price;

    if (Manager.allAssets[assetIndex_].currentSubscription > Manager.allAssets[assetIndex_].sellerBalance) {
      Manager.allAssets[assetIndex_].assetUtilization = 1e6;
    } else {
      Manager.allAssets[assetIndex_].assetUtilization =
          Manager.allAssets[assetIndex_].currentSubscription / Manager.allAssets[assetIndex_].sellerBalance * 1e6;
    }

    Manager.allAssets[assetIndex_].premiumRate = getPremiumRate(assetIndex_);

    if (Manager.allAssets[assetIndex_].currentSubscription > Manager.allAssets[assetIndex_].sellerBalance) {
      Manager.allAssets[assetIndex_].apr =
          (Manager.allAssets[assetIndex_].premiumRate * 0.9) / 7 * 365;
    } else {
      Manager.allAssets[assetIndex_].apr =
          (Manager.allAssets[assetIndex_].currentSubscription * Manager.allAssets[assetIndex_].premiumRate * 0.9) / Manager.allAssets[assetIndex_].sellerBalance / 7 * 365;
    }

    Manager.allAssets[assetIndex_].sellerTidalApr =
        bonusOfS / Manager.allAssets[assetIndex_].sellerBalance * tidalPrice / 7 * 365 * 1e6;
    Manager.allAssets[assetIndex_].guarantorApr =
        (Manager.allAssets[assetIndex_].currentSubscription * Manager.allAssets[assetIndex_].premiumRate * 0.05) / Manager.allAssets[assetIndex_].guarantorValue / 7 * 365;
    Manager.allAssets[assetIndex_].guarantorTidalApr =
        bonusOfG / Manager.allAssets[assetIndex_].guarantorValue * tidalPrice / 7 * 365 * 1e6;
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
        data.premium += Manager.allAssets[i].currentSubscription * Manager.allAssets[i].premiumRate * 0.9;
      }
    }

    data.reserve = (await callFunction(seller.methods.categoryBalance(category_))) / config.baseBase;
    data.apr = data.reserve ? (data.premium / data.reserve / 7 * 365).toFixed(0) : '0';
    data.tokenAPR = '0';  // TODO: Get price
    Manager.allCategories[category_] = data;
  },

  async loadUserBasket(userAddress, willRefresh) {
    if (!willRefresh && Manager.userBasket.length > 0) {
      return Manager.userBasket;
    }

    const array = [];
    let all = [];
    for (let i = 0; i < Manager.allAssets.length; ++i) {
      all.push((async (i) => {
        let isInBasket = await callFunction(seller.methods.userBasket(userAddress, i));
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
    
    Manager.userBasket = array;

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
  },

  async repeat() {
    await Manager.loadMorePayoutRequests();
  },

  async repeat2() {
    for (let i = 0; i < ASSETS_NAME_LIST.length; ++i) {
      await Manager.loadOneAssetExtended(i);
    }
  }
};


Manager.execute();

setInterval(() => {
  Manager.repeat();
}, 60000);

setInterval(() => {
  Manager.repeat2();
}, 600000);


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
  const willRefresh = parseInt(req.query.will_refresh) || 1;

  if (!address) {
    res.status(400).send({
      message: 'missing-address'
    });
    return;
  }

  const baskets = await Manager.loadUserBasket(address, willRefresh);

  res.send(baskets);
});


app.get('/get_payout_requests', async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const data = Manager.payoutRequests.slice(offset, offset + limit);
  res.send(data);
});


app.listen(config.port);


module.exports = app;
