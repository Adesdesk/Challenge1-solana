// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Create a new keypair
const newPair = new Keypair();

// Exact the public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key of the generated keypair", publicKey);

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(newPair.publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};



const airDropSol = async () => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privateKey);
        // Option to Request airdrop of 2 SOL to the created wallet
        //         console.log("Airdropping some SOL to my wallet!");
        //         const fromAirDropSignature = await connection.requestAirdrop(
        //             new PublicKey(myWallet.publicKey),
        //             2 * LAMPORTS_PER_SOL
        //         );
        //         await connection.confirmTransaction(fromAirDropSignature);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };


        // Code block option to request airdrop of 2 SOL to a user's choice wallet
        // Take the account address as a CLI parameter.
        const accountAddress = process.argv[2]; // Retrieve the account address from the CLI parameter

        if (!accountAddress) {
            console.error('Account address is missing. Please provide the account address as a CLI parameter.');
            process.exit(1);
        }
        
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(accountAddress),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};
// To run this version, use "node script.js <account_address>"



// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

mainFunction();
