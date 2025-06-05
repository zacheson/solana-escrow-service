<p align="center">
  <img src="https://raw.githubusercontent.com/solana-labs/solana/master/docs/src/assets/solana-logo.svg" alt="Solana Logo" width="120"/>
</p>

<h1 align="center">
  <span style="background: linear-gradient(90deg, #9333ea, #db2777, #2563eb); -webkit-background-clip: text; color: transparent; font-weight: bold;">
    Solana Escrow Service
  </span>
</h1>

<p align="center">
  <b>Trustless, Secure, and Lightning-Fast Token Escrow on Solana</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-Blockchain-3a3a3a?logo=solana&logoColor=white&style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Anchor-Framework-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/No%20Service%20Fee-0%25-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-Next.js%20%2B%20Tailwind-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Wallet-Phantom-purple?style=for-the-badge"/>
</p>

---

## 🚀 Overview

**Solana Escrow Service** is a robust, production-ready escrow platform built for the Solana blockchain. It enables two parties to securely exchange SPL tokens without the need for a trusted intermediary or any service fees. Designed for business and personal use, the platform leverages Solana's speed and low transaction costs, providing a seamless and intuitive user experience.

### How It Works

- **Initializer**: The user who creates the escrow, specifying the amount of Token A they wish to exchange and the amount of Token B they expect in return.
- **Taker**: The counterparty who fulfills the escrow by providing the required amount of Token B.
- **Token A & Token B**: Any SPL tokens on Solana. The initializer deposits Token A into a secure vault, and the taker deposits Token B to complete the exchange.
- **No Service Fee**: The program is designed to be fully trustless and does not charge any commission or service fee—only standard Solana network fees apply.

#### Main Logic

1. **Initialize Escrow**: The initializer locks Token A in a program-controlled vault and defines the expected amount of Token B.
2. **Take Escrow**: The taker deposits the required Token B. Upon successful deposit, Token A is released to the taker, and Token B is sent to the initializer.
3. **Cancel Escrow**: The initializer can cancel the escrow before it is taken, retrieving their Token A.
4. **Security**: All operations are enforced by the smart contract, ensuring atomic swaps and eliminating counterparty risk.

---

## ✨ Key Features

- 🎯 **Trustless Smart Contract**: All logic is enforced on-chain using Rust and Anchor, ensuring security and transparency.
- ⚡ **Lightning Fast**: Built on Solana for near-instant transaction finality.
- 💸 **Zero Service Fees**: Only pay minimal Solana network fees—no platform commission.
- 🦄 **Modern Frontend**: Intuitive, responsive UI built with Next.js, React, and Tailwind CSS.
- 🦾 **Phantom Wallet Integration**: Seamless wallet connection and transaction signing.
- 🛡️ **Secure Token Vaults**: Tokens are held in program-controlled accounts until the escrow is completed or cancelled.
- 🌈 **Beautiful UI**: Colorful, modern design with dark/light mode support.
- 🔄 **Flexible Token Support**: Works with any SPL token (Token A and Token B are user-defined).
- 🧑‍💻 **Developer Friendly**: Easy setup, clear codebase, and comprehensive test suite.

---

## 🛠️ Setting Up the Solana Development Environment

> **Recommended Tools:**  
> [Rust Analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) | [Anchor VSCode Extension](https://marketplace.visualstudio.com/items?itemName=munanadi.anhor-lang-vscode-extension) | [Dependi](https://marketplace.visualstudio.com/items?itemName=fill-labs.dependi)

### 1. Install Prerequisites

- **Visual Studio Code** (with recommended extensions above)
- **WSL 2 + Ubuntu 24.04** (for Windows users)
  ```sh
  wsl --install
  wsl --install -d Ubuntu-24.04
  ```
- **Solana CLI**

  ```sh
  curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
  ```

- **Check Installed Versions**
  ```sh
  solana --version
  anchor --version
  rustc --version
  cargo --version
  ```

### 2. Wallet Setup

- Create a new account in your **Phantom Wallet** (or any Solana wallet).
- Export your private key and convert it to a Solana Keypair using the provided Node.js script.
- Place your keypair in `/home/<USER_NAME>/.config/solana/id.json` on your Ubuntu/WSL system.
- Request 5 SOL airdrop from [Solana Faucet](https://faucet.solana.com/).

### 3. Configure Solana

- Set your cluster to Devnet:

  ```sh
  solana config set --url devnet
  ```

- Pull the Anchor Docker image for program verification:
  ```sh
  sudo docker pull solanafoundation/anchor:v0.31.1
  ```

---

## 💻 Solana Escrow App & Program

### 1. Clone the Repository

```sh
git clone https://github.com/zacheson/solana-escrow-service.git
cd solana-escrow-service
```

### 2. Install Dependencies

```sh
yarn
cd app && npm install --legacy-peer-deps
```

### 3. Configure Program ID

- Get your program public key:
  ```sh
  anchor keys list
  ```

After running the following command to retrieve your program's public key:

```sh
anchor keys list
```

You will see output similar to:

```
escrow_service: EZUZxExAfPrc4oQt5sXJcyNg4w113erzjkaPEX87BHEw
```

**Copy the `programId` and update your configuration files as follows:**

- **In `Anchor.toml`** (under `[programs.devnet]`):

```toml
[programs.devnet]
escrow_service = "EZUZxExAfPrc4oQt5sXJcyNg4w113erzjkaPEX87BHEw"
```

- **In `lib.rs`** (at the top of your program):

```rust
declare_id!("EZUZxExAfPrc4oQt5sXJcyNg4w113erzjkaPEX87BHEw");
```

> ⚡ **Tip:** Keeping your `programId` consistent across these files ensures your frontend and deployment scripts interact with the correct Solana program on Devnet.

### 4. Build & Deploy

- **Build and Deploy:**
  ```sh
  anchor build
  anchor deploy
  ```
- **Build, Deploy, and Verify:**
  ```sh
  anchor build --verifiable
  anchor deploy --verifiable
  anchor idl init --provider.cluster devnet --filepath target/idl/escrow_service.json <PROGRAM_ID>
  anchor verify -p escrow_service <PROGRAM_ID>
  ```

### 5. Test

```sh
anchor test --skip-deploy --skip-build --skip-local-validator
```

---

## 🌐 Frontend Usage

- **Connect your Phantom wallet**
- **Create or take an escrow** using the intuitive UI
- **Enjoy secure, trustless token swaps!**

---

## 🧩 Tech Stack

- **Solana** (Rust, Anchor)
- **Next.js** (React, TypeScript)
- **Tailwind CSS** (UI)
- **Phantom Wallet** (Web3 integration)
- **Docker** (for Anchor verification)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <b>
    <span style="background: linear-gradient(90deg, #9333ea, #db2777, #2563eb); -webkit-background-clip: text; color: transparent;">
      Secure your token swaps with <i>Solana Escrow Service</i> today!
    </span>
  </b>
</p>
