const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    console.log('Contract addy:', waveContract.address);

    // Get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    // Get total number of waves
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log('totalWaves: ' + waveCount.toNumber());


    // Send a few waves!
    let waveTxn = await waveContract.wave('This is wave #1');
    await waveTxn.wait(); // Wait for the transaction to be mined

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave('This is wave #2');
    await waveTxn.wait(); // Wait for the transaction to be mined

    waveTxn = await waveContract.wave('This is wave #3');
    await waveTxn.wait(); // Wait for the transaction to be mined

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    waveCount = await waveContract.getTotalWaves();
    console.log('totalWaves: ' + waveCount.toNumber());

    // Get contract balance again to see what happens
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();