use listener_lib::eth_listener::print_new_blocks;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Public Ethereum WebSocket endpoint
    let ws_url = "wss://eth-mainnet.g.alchemy.com/v2/demo";
    print_new_blocks(ws_url).await?
}
